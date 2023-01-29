import { NextFunction, Request, Response } from "express";
import { Negotiation } from "../protocols/negotiations.protocols.js";
import { validateNegotiationDoesntExistService, validateUserHasBalanceService } from "../services/negotiations.services.js";

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