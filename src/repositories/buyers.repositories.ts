import prisma from "../database/db.js";
import { Buyer } from "../protocols/buyers.protocols.js";

export async function getBuyerByCpfQuery(cpf: string) {
    const data = await prisma.buyers.findFirst({
        where: {
            cpf: cpf
        }
    })
    return data
}

export async function createBuyerQuery(buyer: Buyer) {
    await prisma.buyers.create({
        data: buyer
    })
}

export async function getAllBuyersQuery() {
    const buyers = await prisma.buyers.findMany()
    return buyers
}