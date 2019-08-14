import Router from 'express'
import UserRoutes from './user'

const router = Router()
const lvlartApiPath = '/lvlart-api'

router.use(lvlartApiPath, UserRoutes)

export default router