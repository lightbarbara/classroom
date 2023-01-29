import { Request, Response } from "express";
import { Buyer } from "../protocols/buyers.protocols.js";
import { createBuyerService, getAllBuyersService } from "../services/buyers.services.js";

export async function createBuyer(req: Request, res: Response): Promise<void> {

    const buyer = req.body as Buyer

    try {

        await createBuyerService(buyer)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getAllBuyers(req: Request, res: Response) {

    try {

        const buyers = await getAllBuyersService()

        res.status(200).send(buyers)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export function getBuyerById(req: Request, res: Response) {

}

export function updateBuyer(req: Request, res: Response) {

}

export function deleteBuyer(req: Request, res: Response) {

}