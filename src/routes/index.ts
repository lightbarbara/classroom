import negotiationsRoutes from './negotiations.routes.js'
import buyersRoutes from './buyers.routes.js'
import realtorsRoutes from './realtors.routes.js'
import housesRoutes from './houses.routes.js'

import { Router } from 'express'

const router = Router()

router.use(negotiationsRoutes)
router.use(buyersRoutes)
router.use(realtorsRoutes)
router.use(housesRoutes)

export default router