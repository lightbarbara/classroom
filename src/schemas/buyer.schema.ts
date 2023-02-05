import joi, { ObjectSchema } from 'joi'
import { Buyer } from '../protocols/buyers.protocols'

export const buyerSchema: ObjectSchema<Buyer> = joi.object({
    name: joi.string().required(),
    cpf: joi.string().length(11).required(),
    balance: joi.number().required()
})