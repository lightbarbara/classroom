import { Request, Response } from "express";
import { Buyer } from "../protocols/buyers.protocols.js";
import { createBuyerService, getAllBuyersService, getBuyerByIdService } from "../services/buyers.services.js";

export async function createBuyer(req: Request, res: Response): Promise<void> {

    const buyer = req.body as Buyer

    try {

        await createBuyerService(buyer)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllBuyers(req: Request, res: Response): Promise<void> {

    try {

        const buyers = await getAllBuyersService()

        res.status(200).send(buyers)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getBuyerById(req: Request, res: Response) {

    const { id } = req.params

    try {

        const buyer = await getBuyerByIdService(parseInt(id))

        res.status(200).send(buyer)

    } catch (err) {

        if (err.name === 'notFound') {
            res.sendStatus(404)
        }

        res.status(500).send(err.message)

    }

}

export function updateBuyer(req: Request, res: Response) {

}

export function deleteBuyer(req: Request, res: Response) {

}