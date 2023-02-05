import { NextFunction, Request, Response } from "express"
import { getHouseByIdService } from "../services/houses.services"

export async function validateHouseId(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const id = req.params.id || req.body.houseId

    try {

        await getHouseByIdService(parseInt(id))

        next()

    } catch (err) {

        if (err.name === 'notFound') {
            return res.sendStatus(404)
        }

        return res.status(500).send(err.message)
    }

}