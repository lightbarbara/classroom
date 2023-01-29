import { NextFunction, Request, Response } from "express";
import { getBuyerByIdService } from "../services/buyers.services.js";

export async function validateBuyerId(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const { id } = req.params

    try {

        await getBuyerByIdService(parseInt(id))

        next()

    } catch (err) {

        if (err.name === 'notFound') {
            return res.sendStatus(404)
        }

        return res.status(500).send(err.message)
    }

}