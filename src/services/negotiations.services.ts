import { Negotiation } from "../protocols/negotiations.protocols";
import { createNegotiationQuery, deleteNegotiationQuery, getAllNegotiationsQuery, getNegotiationByIdQuery, updateNegotiationQuery, validateNegotiationDoesntExistQuery, validateUserHasBalanceQuery } from "../repositories/negotiations.repositories";

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

export async function getNegotiationByIdService(id: number) {

    const negotiation = await getNegotiationByIdQuery(id)

    if (!negotiation) {
        throw { name: 'notFound' }
    }

    return negotiation

}

export async function updateNegotiatonService(negotiation: Negotiation, id: number): Promise<void> {

    await updateNegotiationQuery(negotiation, id)

}

export async function deleteNegotiationService(id: number): Promise<void> {

    await deleteNegotiationQuery(id)

}