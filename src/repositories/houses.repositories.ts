import { houses } from "@prisma/client"
import prisma from "../database/db.js";
import { House } from "../protocols/houses.protocols.js";

export async function createHouseQuery(house: House): Promise<void> {
    await prisma.houses.create({
        data: house
    })
}



export async function getHouseByIdQuery(id: number): Promise<houses> {
    const house = await prisma.houses.findFirst({
        where: {
            id
        }
    })
    return house
}