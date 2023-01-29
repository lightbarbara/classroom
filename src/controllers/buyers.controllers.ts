import { Request, Response } from "express";
import { Buyer } from "../protocols/buyers.protocols.js";
import { createBuyerService, deleteBuyerService, getAllBuyersService, getBuyerByIdService, updateBuyerService } from "../services/buyers.services.js";

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

export async function getBuyerById(req: Request, res: Response): Promise<void> {

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

export async function updateBuyer(req: Request, res: Response): Promise<void> {

    const buyer = req.body as Buyer

    const { id } = req.params

    try {

        await updateBuyerService(buyer, parseInt(id))

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function deleteBuyer(req: Request, res: Response) {

    const { id } = req.params

    try {

        await deleteBuyerService(parseInt(id))

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}