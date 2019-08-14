import Router from 'express'
import * as userController from '../controllers/users'

const router = new Router()

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/users', userController.getUsers)

export default router