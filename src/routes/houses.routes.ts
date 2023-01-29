import { Router } from "express";
import { createHouse, deleteHouse, getAllHouses, getHouseById, updateHouse } from "../controllers/houses.controllers.js";
import { validateHouseId } from "../middlewares/houses.middlewares.js";
import validateSchemaMiddleware from "../middlewares/validateSchema.middleware.js";
import { houseSchema } from "../schemas/house.schema.js";

const router = Router()

router.post('/houses', validateSchemaMiddleware(houseSchema), createHouse)
router.get('/houses', getAllHouses)
router.get('/houses/:id', getHouseById)
router.put('/houses/:id', validateHouseId, validateSchemaMiddleware(houseSchema), updateHouse)
router.delete('/houses/:id', validateHouseId, deleteHouse)

export default router