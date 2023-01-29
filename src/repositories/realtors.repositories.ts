import prisma from "../database/db.js";

export async function getRealtorByCpfQuery(cpf: string) {
    const data = await prisma.realtors.findFirst({
        where: {
            cpf: cpf
        }
    })
    return data
}