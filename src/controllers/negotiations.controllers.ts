import { Request, Response } from "express";
import { Negotiation } from "../protocols/negotiations.protocols.js";
import { createNegotiationService, getAllNegotiationsService, getNegotiationByIdService } from "../services/negotiations.services.js";

export async function createNegotiation(req: Request, res: Response): Promise<void> {

    const negotiation = res.locals.negotiation as Negotiation

    try {

        await createNegotiationService(negotiation)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllNegotiations(req: Request, res: Response): Promise<void> {

    try {

        const negotiations = await getAllNegotiationsService()

        res.status(200).send(negotiations)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getNegotiationById(req: Request, res: Response): Promise<void> {

    const { id } = req.params

    try {

        const negotiation = await getNegotiationByIdService(parseInt(id))

        res.status(200).send(negotiation)

    } catch (err) {

        if (err.name === 'notFound') {
            res.sendStatus(404)
        }

        res.status(500).send(err.message)

    }

}

export async function updateNegotiation(req: Request, res: Response): Promise<void> {

}

export async function deleteNegotiation(req: Request, res: Response): Promise<void> {
    
}