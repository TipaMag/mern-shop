const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if(!token) res.status(500).json({msg: 'Invalid Authentication 1'})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) res.status(500).json({msg: 'Invalid Authentication (verify)'})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth