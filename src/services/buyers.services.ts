import { buyers } from "@prisma/client";
import { Buyer } from "../protocols/buyers.protocols.js";
import { createBuyerQuery, deleteBuyerQuery, getAllBuyersQuery, getBuyerByCpfQuery, getBuyerByIdQuery, updateBuyerQuery } from "../repositories/buyers.repositories.js";

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

export async function getBuyerByIdService(id: number): Promise<buyers> {

    const buyer = await getBuyerByIdQuery(id)

    if (!buyer) {
        throw { name: 'notFound' }
    }

    return buyer

}

export async function updateBuyerService(buyer: Buyer, id: number): Promise<void> {

    await updateBuyerQuery(buyer, id)

}

export async function deleteBuyerService(id: number): Promise<void> {

    await deleteBuyerQuery(id)

}