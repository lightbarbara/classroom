import { Router } from "express";
import { createNegotiation, deleteNegotiation, getAllNegotiations, getNegotiationById, updateNegotiation } from "../controllers/negotiations.controllers.js";
import { validateBuyerId } from "../middlewares/buyers.middlewares.js";
import { validateHouseId } from "../middlewares/houses.middlewares.js";
import { validateNegotiationDoesntExist, validateNegotiationId, validateUserHasBalance } from "../middlewares/negotiations.middleware.js";
import { validateRealtorId } from "../middlewares/realtors.middlwares.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware.js";
import { negotiationSchema } from "../schemas/negotiation.schema.js";

const router = Router()

router.post('/negotiations', validateBuyerId, validateRealtorId, validateHouseId, validateNegotiationDoesntExist, validateUserHasBalance, validateSchemaMiddleware(negotiationSchema), createNegotiation)
router.get('/negotiations', getAllNegotiations)
router.get('/negotiations/:id', getNegotiationById)
router.put('/negotiations/:id', validateNegotiationId, validateSchemaMiddleware(negotiationSchema), updateNegotiation)
router.delete('/negotiations/:id', validateNegotiationId, deleteNegotiation)

export default router