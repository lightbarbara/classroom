import negotiationsRoutes from './negotiations.routes'
import buyersRoutes from './buyers.routes'
import realtorsRoutes from './realtors.routes'
import housesRoutes from './houses.routes'

import { Router } from 'express'

const router = Router()

router.use(negotiationsRoutes)
router.use(buyersRoutes)
router.use(realtorsRoutes)
router.use(housesRoutes)

export default router