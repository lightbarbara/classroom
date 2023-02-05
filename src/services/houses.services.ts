import { houses } from "@prisma/client"
import { House } from "../protocols/houses.protocols"
import { createHouseQuery, deleteHouseQuery, getAllHousesQuery, getHouseByIdQuery, updateHouseQuery } from "../repositories/houses.repositories"

export async function createHouseService(house: House): Promise<void> {

    await createHouseQuery(house)

}

export async function getAllHousesService(): Promise<houses[]> {

    const houses = await getAllHousesQuery()

    return houses

}

export async function getHouseByIdService(id: number): Promise<houses> {

    const house = await getHouseByIdQuery(id)

    if (!house) {
        throw { name: 'notFound' }
    }

    return house

}

export async function updateHouseService(house: House, id: number): Promise<void> {

    await updateHouseQuery(house, id)

}

export async function deleteHouseService(id: number): Promise<void> {

    await deleteHouseQuery(id)

}