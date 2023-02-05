import { Router } from "express";
import { createRealtor, deleteRealtor, getAllRealtors, getRealtorById, updateRealtor } from "../controllers/realtors.controllers";
import { validateRealtorId } from "../middlewares/realtors.middlwares";
import validateCpf from "../middlewares/validateCpf.middleware";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { realtorSchema } from "../schemas/realtor.schema";

const router = Router()

router.post('/realtors', validateSchemaMiddleware(realtorSchema), validateCpf, createRealtor)
router.get('/realtors', getAllRealtors)
router.get('/realtors/:id', getRealtorById)
router.put('/realtors/:id', validateRealtorId, validateSchemaMiddleware(realtorSchema), validateCpf, updateRealtor)
router.delete('/realtors/:id', validateRealtorId, deleteRealtor)

export default router