import { Request, Response } from "express";
import { House } from "../protocols/houses.protocols";
import { createHouseService, deleteHouseService, getAllHousesService, getHouseByIdService, updateHouseService } from "../services/houses.services";

export async function createHouse(req: Request, res: Response): Promise<void> {

    const house = req.body as House

    try {

        await createHouseService(house)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllHouses(req: Request, res: Response): Promise<void> {

    try {

        const houses = await getAllHousesService()

        res.status(200).send(houses)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getHouseById(req: Request, res: Response): Promise<void> {

    const { id } = req.params

    try {

        const house = await getHouseByIdService(parseInt(id))

        res.status(200).send(house)

    } catch (err) {

        if (err.name === 'notFound') {
            res.sendStatus(404)
        }

        res.status(500).send(err.message)

    }

}

export async function updateHouse(req: Request, res: Response): Promise<void> {

    const house = req.body as House

    const { id } = req.params

    try {

        await updateHouseService(house, parseInt(id))

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function deleteHouse(req: Request, res: Response): Promise<void> {

    const { id } = req.params

    try {

        await deleteHouseService(parseInt(id))

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}