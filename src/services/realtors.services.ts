import { realtors } from "@prisma/client";
import { Realtor } from "../protocols/realtors.protocols.js";
import { getRealtorByCpfQuery } from "../repositories/realtors.repositories.js";

export async function getRealtorByCpfService(cpf: string, id): Promise<realtors> {
    const cpfExistsOnRealtors = await getRealtorByCpfQuery(cpf)

    if (cpfExistsOnRealtors) {

        if (cpfExistsOnRealtors.id !== id) {
            throw { name: 'conflict' }
        }

    }

    return cpfExistsOnRealtors
}

export function createRealtorService(realtor: Realtor) {



}

export function getAllRealtorsService() {

}

export function getRealtorByIdService() {

}

export function updateRealtorService() {

}

export function deleteRealtorService() {

}