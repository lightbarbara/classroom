import { negotiations } from "@prisma/client";
import prisma from "../database/db";
import { Negotiation } from "../protocols/negotiations.protocols";

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

export async function validateUserHasBalanceQuery(negotiation: Negotiation): Promise<boolean> {

    const userBalance = await prisma.buyers.findFirst({
        where: {
            id: negotiation.buyerId
        },
        select: {
            balance: true
        }
    })

    const housePrice = await prisma.houses.findFirst({
        where: {
            id: negotiation.houseId
        },
        select: {
            price: true
        }
    })

    if (userBalance.balance < housePrice.price) {
        return false
    } else {
        return true
    }

}

export async function createNegotiationQuery(negotiation: Negotiation): Promise<void> {
    await prisma.negotiations.create({
        data: negotiation
    })
}

export async function getAllNegotiationsQuery() {
    const negotiations = await prisma.negotiations.findMany({
        select: {
            id: true,
            status: true,
            rating: true,
            houses: {
                select: {
                    cep: true,
                    price: true
                }
            },
            buyers: {
                select: {
                    name: true,
                    balance: true
                }
            },
            realtors: {
                select: {
                    name: true,
                    salesCommission: true
                }
            }
        }
    })
    return negotiations
}

export async function getNegotiationByIdQuery(id: number) {
    const negotiation = await prisma.negotiations.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            status: true,
            rating: true,
            houses: {
                select: {
                    cep: true,
                    price: true
                }
            },
            buyers: {
                select: {
                    name: true,
                    balance: true
                }
            },
            realtors: {
                select: {
                    name: true,
                    salesCommission: true
                }
            }
        }
    })
    return negotiation
}

export async function updateNegotiationQuery(negotiation: Negotiation, id: number): Promise<void> {
    await prisma.negotiations.update({
        where: { id },
        data: negotiation
    })
}

export async function deleteNegotiationQuery(id: number): Promise<void> {
    await prisma.negotiations.delete({
        where: { id }
    })
}