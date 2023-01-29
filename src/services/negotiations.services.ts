import { Negotiation } from "../protocols/negotiations.protocols.js";
import { createNegotiationQuery, validateNegotiationDoesntExistQuery } from "../repositories/negotiations.repositories.js";

export async function validateNegotiationDoesntExistService(negotiation: Negotiation): Promise<void> {

    const negotiationExists = await validateNegotiationDoesntExistQuery(negotiation)

    if (negotiationExists) {
        throw { name: 'conflict' }
    }

}

export async function createNegotiationService(negotiation: Negotiation): Promise<void> {

    await createNegotiationQuery(negotiation)

}