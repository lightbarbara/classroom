import { Router } from "express";
import { createBuyer, deleteBuyer, getAllBuyers, getBuyerById, updateBuyer } from "../controllers/buyers.controllers.js";
import validateCpf from "../middlewares/validateCpf.middleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware.js";
import { buyerSchema } from "../schemas/buyer.schema.js";

const router = Router()

router.post('/buyers', validateSchemaMiddleware(buyerSchema), validateCpf, createBuyer)
router.get('/buyers', getAllBuyers)
router.get('/buyers/:id', getBuyerById)
router.put('/buyers/:id', updateBuyer)
router.delete('/buyers/:id', deleteBuyer)

export default router