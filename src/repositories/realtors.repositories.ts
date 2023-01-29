import { realtors } from "@prisma/client";
import prisma from "../database/db.js";

export async function getRealtorByCpfQuery(cpf: string): Promise<realtors> {
    const data = await prisma.realtors.findFirst({
        where: {
            cpf: cpf
        }
    })
    return data
}

export async function getRealtorByIdQuery(id: number): Promise<realtors> {
    const realtor = await prisma.realtors.findFirst({
        where: {
            id
        }
    })
    return realtor
}