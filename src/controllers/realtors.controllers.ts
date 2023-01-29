import { Request, Response } from "express";
import { Realtor } from "../protocols/realtors.protocols";
import { createRealtorService } from "../services/realtors.services";

export async function createRealtor(req: Request, res: Response): Promise<void> {

    const realtor = req.body as Realtor

    try {

        await createRealtorService(realtor)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export function getAllRealtors(req: Request, res: Response) {

}

export function getRealtorById(req: Request, res: Response) {

}

export function updateRealtor(req: Request, res: Response) {

}

export function deleteRealtor(req: Request, res: Response) {

}