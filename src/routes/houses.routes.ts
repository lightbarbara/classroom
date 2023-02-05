import { Router } from "express";
import { createHouse, deleteHouse, getAllHouses, getHouseById, updateHouse } from "../controllers/houses.controllers";
import { validateHouseId } from "../middlewares/houses.middlewares";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware";
import { houseSchema } from "../schemas/house.schema";

const router = Router()

router.post('/houses', validateSchemaMiddleware(houseSchema), createHouse)
router.get('/houses', getAllHouses)
router.get('/houses/:id', getHouseById)
router.put('/houses/:id', validateHouseId, validateSchemaMiddleware(houseSchema), updateHouse)
router.delete('/houses/:id', validateHouseId, deleteHouse)

export default router