import { Router } from "express";
import { createHouse, deleteHouse, getAllHouses, getHouseById, updateHouse } from "../controllers/houses.controllers.js";

const router = Router()

router.post('/houses', createHouse)
router.get('/houses', getAllHouses)
router.get('/houses/:id', getHouseById)
router.put('/houses/:id', updateHouse)
router.delete('/houses/:id', deleteHouse)

export default router