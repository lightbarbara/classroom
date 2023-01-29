import { houses } from "@prisma/client"
import { House } from "../protocols/houses.protocols.js"
import { createHouseQuery, getHouseByIdQuery } from "../repositories/houses.repositories.js"

export async function createHouseService(house: House): Promise<void> {

    await createHouseQuery(house)

}

export async function getHouseByIdService(id: number): Promise<houses> {

    const house = await getHouseByIdQuery(id)

    if (!house) {
        throw { name: 'notFound' }
    }

    return house

}