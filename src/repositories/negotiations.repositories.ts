import { negotiations } from "@prisma/client";
import prisma from "../database/db.js";
import { Negotiation } from "../protocols/negotiations.protocols.js";

export async function validateNegotiationDoesntExistQuery(negotiation: Negotiation): Promise<negotiations> {
    const negotiationExists = await prisma.negotiations.findFirst({
        where: {
            buyerId: negotiation.buyerId,
            houseId: negotiation.houseId,
            realtorId: negotiation.realtorId
        }
    })
    return negotiationExists
}

export async function createNegotiationQuery(negotiation: Negotiation): Promise<void> {
    await prisma.negotiations.create({
        data: negotiation
    })
}