import { Request, Response } from "express";
import { House } from "../protocols/houses.protocols.js";
import { createHouseService } from "../services/houses.services.js";

export async function createHouse(req: Request, res: Response) {

    const house = req.body as House

    try {

        await createHouseService(house)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllHouses(req: Request, res: Response) {

}

export async function getHouseById(req: Request, res: Response) {

}

export async function updateHouse(req: Request, res: Response) {

}

export async function deleteHouse(req: Request, res: Response) {

}