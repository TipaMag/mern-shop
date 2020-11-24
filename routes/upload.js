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

// Upload image
router.post('/upload', (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ msg: 'No files uploaded' })

        const file = req.files.file
        if (file.size > 1024 * 1024) { // 1024*1024 = 1mb
            removeTmpFile(file.tempFilePath)
            res.status(400).json({ msg: 'File is too large'}) 
        } 
            
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            removeTmpFile(file.tempFilePath)
            res.status(400).json({msg: 'File is not supports'})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: 'test'}, (error, result) => {
            if(error) throw error

            removeTmpFile(file.tempFilePath)
            
            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const removeTmpFile = (path) => {
    fs.unlink(path, (err) => {
        if(err) throw err
    })
}

module.exports = router