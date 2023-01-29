import { houses } from "@prisma/client"
import prisma from "../database/db.js";

export async function getHouseByIdQuery(id: number): Promise<houses> {
    const house = await prisma.houses.findFirst({
        where: {
            id
        }
    })
    return house
}