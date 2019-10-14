const Router = require('express')
const userController = require('../controllers/users')

const router = new Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/users', userController.getUsers)

module.exports = router