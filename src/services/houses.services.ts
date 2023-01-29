import { houses } from "@prisma/client"
import { getHouseByIdQuery } from "../repositories/houses.repositories"

export async function gethouseByIdService(id: number): Promise<houses> {

    const house = await getHouseByIdQuery(id)

    if (!house) {
        throw { name: 'notFound' }
    }

    return house

}