import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateSchemaMiddleware(schema: ObjectSchema) {

    return (req: Request, res: Response, next: NextFunction) => {

        try {
            const validation = schema.validate(req.body)

            if (validation.error) {

                const errors = validation.error.details.map(detail => detail.message)

                return res.status(422).send({ message: errors })

            }
        } catch (err) {
            res.status(500).send(err.message)
        }

        next()
    }
}