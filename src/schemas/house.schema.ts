import joi, { ObjectSchema } from "joi";
import { House } from "../protocols/houses.protocols";

export const houseSchema: ObjectSchema<House> = joi.object({
    cep: joi.string().length(8).required(),
    price: joi.number().required()
})