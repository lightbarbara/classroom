import { Request, Response } from "express";
import { Realtor } from "../protocols/realtors.protocols";
import { createRealtorService, getAllRealtorsService, getRealtorByIdService, updateRealtorService } from "../services/realtors.services";

export async function createRealtor(req: Request, res: Response): Promise<void> {

    const realtor = req.body as Realtor

    try {

        await createRealtorService(realtor)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllRealtors(req: Request, res: Response): Promise<void> {

    try {

        const realtors = await getAllRealtorsService()

        res.status(200).send(realtors)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getRealtorById(req: Request, res: Response) {

    const { id } = req.params

    try {

        const realtor = await getRealtorByIdService(parseInt(id))

        res.status(200).send(realtor)

    } catch (err) {

        if (err.name === 'notFound') {
            res.sendStatus(404)
        }

        res.status(500).send(err.message)

    }

}

export async function updateRealtor(req: Request, res: Response) {

    const realtor = req.body as Realtor

    const { id } = req.params

    try {

        await updateRealtorService(realtor, parseInt(id))

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function deleteRealtor(req: Request, res: Response) {

}