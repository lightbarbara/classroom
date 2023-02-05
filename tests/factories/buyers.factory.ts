import faker from "@faker-js/faker";
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import prisma from "database/db";

export async function createBuyer() {
    return prisma.buyers.create({
        data: {
            name: faker.name.findName(),
            cpf: generateCPF(),
            balance: 20000
        }
    })
}