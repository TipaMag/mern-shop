const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/refresh_token', userCtrl.refreshToken)
router.get('/info', auth, userCtrl.getUser)
router.patch('/addcart', auth, userCtrl.addToCart)
router.patch('/deletecart', auth, userCtrl.removeFromCart)
router.get('/history', auth, userCtrl.history)

module.exports = router