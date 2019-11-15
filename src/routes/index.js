const Router = require('express')
const UserRoutes = require('./user')
const AuthRoutes = require('./auth')

const router = Router()
const lvlartApiPath = '/lvlart-api'

router.use(lvlartApiPath, UserRoutes)
router.use(lvlartApiPath, AuthRoutes)

module.exports = router