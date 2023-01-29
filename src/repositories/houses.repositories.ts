import { houses } from "@prisma/client"
import prisma from "../database/db.js";
import { House } from "../protocols/houses.protocols.js";

export async function createHouseQuery(house: House): Promise<void> {
    await prisma.houses.create({
        data: house
    })
}

export async function getAllHousesQuery(): Promise<houses[]> {
    const houses = await prisma.houses.findMany()
    return houses
}

export async function getHouseByIdQuery(id: number): Promise<houses> {
    const house = await prisma.houses.findFirst({
        where: {
            id
        }
    })
    return house
}

export async function updateHouseQuery(house: House, id: number): Promise<void> {
    await prisma.houses.update({
        where: { id },
        data: house
    })
}

export async function deleteHouseQuery(id: number): Promise<void> {
    await prisma.houses.delete({
        where: { id }
    })
}