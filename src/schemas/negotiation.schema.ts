import joi, { ObjectSchema } from 'joi'
import { Negotiation } from "../protocols/negotiations.protocols";

export const negotiationSchema: ObjectSchema<Negotiation> = joi.object({
    houseId: joi.number().required(),
    buyerId: joi.number().required(),
    realtorId: joi.number().required(),
    status: joi.valid('on_going', 'bought', 'failed').required(),
    rating: joi.string()
})