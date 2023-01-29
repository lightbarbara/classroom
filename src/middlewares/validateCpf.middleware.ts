import { NextFunction, Request, response, Response } from "express";
import { getBuyerByCpfService } from "../services/buyers.services.js";
import { getRealtorByCpfService } from "../services/realtors.services.js";

export default async function validateCpf(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const { cpf } = req.body

    try {

        await getBuyerByCpfService(cpf)

        await getRealtorByCpfService(cpf)

        next()

    } catch (err) {

        if (err.name === 'conflict') {
            return res.sendStatus(409)
        }

        res.status(500).send(err.message)
    }

}