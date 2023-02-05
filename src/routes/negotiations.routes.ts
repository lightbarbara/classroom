import { Router } from "express";
import { createNegotiation, deleteNegotiation, getAllNegotiations, getNegotiationById, updateNegotiation } from "../controllers/negotiations.controllers";
import { validateBuyerId } from "../middlewares/buyers.middlewares";
import { validateHouseId } from "../middlewares/houses.middlewares";
import { validateNegotiationDoesntExist, validateNegotiationId, validateUserHasBalance } from "../middlewares/negotiations.middleware";
import { validateRealtorId } from "../middlewares/realtors.middlwares";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { negotiationSchema } from "../schemas/negotiation.schema";

const router = Router()

router.post('/negotiations', validateBuyerId, validateRealtorId, validateHouseId, validateNegotiationDoesntExist, validateUserHasBalance, validateSchemaMiddleware(negotiationSchema), createNegotiation)
router.get('/negotiations', getAllNegotiations)
router.get('/negotiations/:id', getNegotiationById)
router.put('/negotiations/:id', validateNegotiationId, validateSchemaMiddleware(negotiationSchema), updateNegotiation)
router.delete('/negotiations/:id', validateNegotiationId, deleteNegotiation)

export default router