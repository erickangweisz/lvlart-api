const Router = require('express')
const userController = require('../controllers/users')

const router = new Router()

router.get('/users', userController.getUsers)

module.exports = router