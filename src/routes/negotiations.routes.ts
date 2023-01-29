import { Router } from "express";
import { createNegotiation, deleteNegotiation, getAllNegotiations, getNegotiationById, updateNegotiation } from "../controllers/negotiations.controllers.js";

const router = Router()

router.post('/negotiations', createNegotiation)
router.get('/negotiations', getAllNegotiations)
router.get('/negotiations/:id', getNegotiationById)
router.put('/negotiations/:id', updateNegotiation)
router.delete('/negotiations/:id', deleteNegotiation)

export default router