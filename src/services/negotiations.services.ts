import { negotiations } from "@prisma/client";
import { Negotiation } from "../protocols/negotiations.protocols.js";
import { createNegotiationQuery, getAllNegotiationsQuery, validateNegotiationDoesntExistQuery, validateUserHasBalanceQuery } from "../repositories/negotiations.repositories.js";

export async function validateNegotiationDoesntExistService(negotiation: Negotiation): Promise<void> {

    const negotiationExists = await validateNegotiationDoesntExistQuery(negotiation)

    if (negotiationExists) {
        throw { name: 'conflict' }
    }

}

export async function validateUserHasBalanceService(negotiation: Negotiation) {

    const userHasBalance = await validateUserHasBalanceQuery(negotiation)

    if (!userHasBalance) {
        throw { name: 'notEnough' }
    }

}

export async function createNegotiationService(negotiation: Negotiation): Promise<void> {

    await createNegotiationQuery(negotiation)

}

export async function getAllNegotiationsService() {

    const negotiations = await getAllNegotiationsQuery()

    return negotiations

}