const Router = require('express')
const userController = require('../controllers/users')

const router = new Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users', userController.getUsers)

module.exports = router