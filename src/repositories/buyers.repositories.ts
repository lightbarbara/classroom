import { buyers } from "@prisma/client";
import prisma from "../database/db";
import { Buyer } from "../protocols/buyers.protocols";

export async function getBuyerByCpfQuery(cpf: string): Promise<buyers> {
    const buyer = await prisma.buyers.findFirst({
        where: {
            cpf: cpf
        }
    })
    return buyer
}

export async function createBuyerQuery(buyer: Buyer): Promise<void> {
    await prisma.buyers.create({
        data: buyer
    })
}

export async function getAllBuyersQuery(): Promise<buyers[]> {
    const buyers = await prisma.buyers.findMany()
    return buyers
}

export async function getBuyerByIdQuery(id: number): Promise<buyers> {
    const buyer = await prisma.buyers.findFirst({
        where: {
            id
        }
    })
    return buyer
}

export async function updateBuyerQuery(buyer: Buyer, id: number): Promise<void> {
    await prisma.buyers.update({
        where: { id },
        data: buyer
    })
}

export async function deleteBuyerQuery(id: number): Promise<void> {
    await prisma.buyers.delete({
        where: { id }
    })
}