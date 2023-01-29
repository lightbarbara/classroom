import { realtors } from "@prisma/client";
import { Realtor } from "../protocols/realtors.protocols.js";
import { createRealtorQuery, getAllRealtorsQuery, getRealtorByCpfQuery, getRealtorByIdQuery } from "../repositories/realtors.repositories.js";

export async function getRealtorByCpfService(cpf: string, id): Promise<realtors> {
    const cpfExistsOnRealtors = await getRealtorByCpfQuery(cpf)

    if (cpfExistsOnRealtors) {

        if (cpfExistsOnRealtors.id !== id) {
            throw { name: 'conflict' }
        }

    }

    return cpfExistsOnRealtors
}

export async function createRealtorService(realtor: Realtor): Promise<void> {

    await createRealtorQuery(realtor)

}

export async function getAllRealtorsService() {

    const realtors = await getAllRealtorsQuery()

    return realtors

}

export async function getRealtorByIdService(id: number) {

    const realtor = await getRealtorByIdQuery(id)

    if (!realtor) {
        throw { name: 'notFound' }
    }

    return realtor

}

export function updateRealtorService() {

}

export function deleteRealtorService() {

}