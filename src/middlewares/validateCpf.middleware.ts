import { NextFunction, Request, response, Response } from "express";
import { getBuyerByCpfService } from "../services/buyers.services.js";
import { getRealtorByCpfService } from "../services/realtors.services.js";

export default async function validateCpf(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const { cpf } = req.body

    const { id } = req.params

    try {

        await getBuyerByCpfService(cpf, parseInt(id))

        await getRealtorByCpfService(cpf, parseInt(id))

        next()

    } catch (err) {

        if (err.name === 'conflict') {
            return res.sendStatus(409)
        }

        res.status(500).send(err.message)
    }

}