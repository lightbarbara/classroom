import { realtors } from "@prisma/client";
import prisma from "../database/db.js";
import { Realtor } from "../protocols/realtors.protocols.js";

export async function getRealtorByCpfQuery(cpf: string): Promise<realtors> {
    const data = await prisma.realtors.findFirst({
        where: {
            cpf: cpf
        }
    })
    return data
}

export async function createRealtorQuery(realtor: Realtor): Promise<void> {
    await prisma.realtors.create({
        data: realtor
    })
}

export async function getAllRealtorsQuery(): Promise<realtors[]> {
    const realtors = await prisma.realtors.findMany()
    return realtors
}

export async function getRealtorByIdQuery(id: number): Promise<realtors> {
    const realtor = await prisma.realtors.findFirst({
        where: {
            id
        }
    })
    return realtor
}