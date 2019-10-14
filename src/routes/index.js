const Router = require('express')
const UserRoutes = require('./user')

const router = Router()
const lvlartApiPath = '/lvlart-api'

router.use(lvlartApiPath, UserRoutes)

module.exports = router