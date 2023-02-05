import { Router } from "express";
import { createBuyer, deleteBuyer, getAllBuyers, getBuyerById, updateBuyer } from "../controllers/buyers.controllers";
import { validateBuyerId } from "../middlewares/buyers.middlewares";
import validateCpf from "../middlewares/validateCpf.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { buyerSchema } from "../schemas/buyer.schema";

const router = Router()

router.post('/buyers', validateSchemaMiddleware(buyerSchema), validateCpf, createBuyer)
router.get('/buyers', getAllBuyers)
router.get('/buyers/:id', getBuyerById)
router.put('/buyers/:id', validateBuyerId, validateSchemaMiddleware(buyerSchema), validateCpf, updateBuyer)
router.delete('/buyers/:id', validateBuyerId, deleteBuyer)

export default router