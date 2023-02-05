import faker from "@faker-js/faker";
import prisma from "database/db";
import { createBuyer } from "./buyers.factory";
import { createHouse } from "./houses-factory";
import { createRealtor } from "./realtors.factory";

export async function createNegotiation() {

    const buyer = await createBuyer()

    const realtor = await createRealtor()

    const house = await createHouse()

    return prisma.negotiations.create({
        data: {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        }
    })
}