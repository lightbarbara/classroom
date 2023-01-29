import { NextFunction, Request, Response } from "express"
import { gethouseByIdService } from "../services/houses.services"

export async function validateHouseId(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const { id } = req.params

    try {

        await gethouseByIdService(parseInt(id))

        next()

    } catch (err) {

        if (err.name === 'notFound') {
            return res.sendStatus(404)
        }

        return res.status(500).send(err.message)
    }

}