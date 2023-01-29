import { NextFunction, Request, Response } from "express";
import { getRealtorByIdService } from "../services/realtors.services.js";

export async function validateRealtorId(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const id = req.params.id || req.body.realtorId

    try {

        await getRealtorByIdService(parseInt(id))

        next()

    } catch (err) {

        if (err.name === 'notFound') {
            return res.sendStatus(404)
        }

        return res.status(500).send(err.message)
    }

}