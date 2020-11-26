const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// Upload image only admin can use
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ msg: 'No files uploaded' })

        const file = req.files.file
        if (file.size > 1024 * 1024) { // 1024*1024 = 1mb
            removeTmpFile(file.tempFilePath)
            res.status(400).json({ msg: 'File is too large' })
        }

        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            removeTmpFile(file.tempFilePath)
            res.status(400).json({ msg: 'File is not supports' })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'test' }, (error, result) => {
            if (error) throw error

            removeTmpFile(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

// Delete image only admin can use
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body
        if(!public_id) return res.status(400).json({msg: 'No image select'})

        cloudinary.v2.uploader.destroy(public_id, (error, result) => {
            if (error) throw error
            if(result.result === 'not found') return res.status(404).json({msg: 'Image not found'})

            res.json({msg: 'Image deleted'})
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const removeTmpFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}



module.exports = router