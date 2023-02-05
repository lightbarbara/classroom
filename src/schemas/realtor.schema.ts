import joi, { ObjectSchema } from 'joi'
import { Realtor } from '../protocols/realtors.protocols'

export const realtorSchema: ObjectSchema<Realtor> = joi.object({
    name: joi.string().required(),
    cpf: joi.string().length(11).required(),
    salesCommission: joi.number().required()
})