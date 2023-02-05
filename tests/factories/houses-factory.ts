import faker from "@faker-js/faker";
import prisma from "database/db";

export async function createHouse() {
    return prisma.houses.create({
        data: {
            cep: '12345678',
            price: faker.datatype.number()
        }
    })
}