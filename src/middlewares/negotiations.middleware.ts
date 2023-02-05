import { NextFunction, Request, Response } from "express";
import { Negotiation } from "../protocols/negotiations.protocols";
import { getNegotiationByIdService, validateNegotiationDoesntExistService, validateUserHasBalanceService } from "../services/negotiations.services";

export async function validateNegotiationDoesntExist(req: Request, res: Response, next: NextFunction): Promise<void> {

    const negotiation = req.body as Negotiation

    try {

        await validateNegotiationDoesntExistService(negotiation)

        res.locals.negotiation = negotiation

        next()

    } catch (err) {

        if (err.name === 'conflict') {
            res.sendStatus(409)
        }

        res.status(500).send(err.message)
    }

}

export async function validateUserHasBalance(req: Request, res: Response, next: NextFunction): Promise<void> {

    const negotiation = res.locals.negotiation as Negotiation

    try {

        await validateUserHasBalanceService(negotiation)

        next()

    } catch (err) {

        if (err.name === 'notEnough') {
            res.sendStatus(406)
        }

        res.status(500).send(err.message)

    }

}

export async function validateNegotiationId(req: Request, res: Response, next: NextFunction): Promise<Response> {

    const id = req.params.id

    try {

        await getNegotiationByIdService(parseInt(id))

        next()

    } catch (err) {

        if (err.name === 'notFound') {
            return res.sendStatus(404)
        }

        return res.status(500).send(err.message)
    }

}