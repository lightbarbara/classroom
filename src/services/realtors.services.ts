import { realtors } from "@prisma/client";
import { Realtor } from "../protocols/realtors.protocols.js";
import { getRealtorByCpf } from "../repositories/realtors.repositories.js";

export async function getRealtorByCpfService(cpf: string): Promise<realtors> {
    const cpfExistsOnRealtors = await getRealtorByCpf(cpf)

    if (cpfExistsOnRealtors) {
        throw { name: 'conflict' }
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