import { buyers } from "@prisma/client";
import { Buyer } from "../protocols/buyers.protocols.js";
import { createBuyerQuery, getBuyerByCpfQuery } from "../repositories/buyers.repositories.js";

export async function getBuyerByCpfService(cpf: string): Promise<buyers> {
    const cpfExistsOnBuyers = await getBuyerByCpfQuery(cpf)

    if (cpfExistsOnBuyers) {
        throw { name: 'conflict' }
    }

    return cpfExistsOnBuyers
}

export async function createBuyerService(buyer: Buyer): Promise<void> {

    await createBuyerQuery(buyer)

}

export function getAllBuyersService() {

}

export function getBuyerByIdService() {

}

export function updateBuyerService() {

}

export function deleteBuyerService() {

}