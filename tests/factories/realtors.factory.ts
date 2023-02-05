import faker from "@faker-js/faker";
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import prisma from "database/db";

export async function createRealtor() {
    return prisma.realtors.create({
        data: {
            name: faker.name.findName(),
            cpf: generateCPF(),
            salesCommission: faker.datatype.float({min: 0, max: 1})
        }
    })
}