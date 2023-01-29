import { Router } from "express";
import { createRealtor, deleteRealtor, getAllRealtors, getRealtorById, updateRealtor } from "../controllers/realtors.controllers.js";

const router = Router()

router.post('/realtors', createRealtor)
router.get('/realtors', getAllRealtors)
router.get('/realtors/:id', getRealtorById)
router.put('/realtors/:id', updateRealtor)
router.delete('/realtors/:id', deleteRealtor)

export default router