import { buyers } from "@prisma/client";
import { Buyer } from "../protocols/buyers.protocols.js";
import { createBuyerQuery, getAllBuyersQuery, getBuyerByCpfQuery, getBuyerByIdQuery } from "../repositories/buyers.repositories.js";

export async function getBuyerByCpfService(cpf: string, id): Promise<buyers> {
    const cpfExistsOnBuyers = await getBuyerByCpfQuery(cpf)

    if (cpfExistsOnBuyers) {

        if (cpfExistsOnBuyers.id !== id) {
            throw { name: 'conflict' }
        }

    }

    return cpfExistsOnBuyers
}

export async function createBuyerService(buyer: Buyer): Promise<void> {

    await createBuyerQuery(buyer)

}

export async function getAllBuyersService(): Promise<buyers[]> {

    const buyers = await getAllBuyersQuery()

    return buyers

}

export async function getBuyerByIdService(id: number) {

    const buyer = await getBuyerByIdQuery(id)

    if (!buyer) {
        throw { name: 'notFound' }
    }

    return buyer

}

export function updateBuyerService() {

}

export function deleteBuyerService() {

}