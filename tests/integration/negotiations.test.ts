import faker from "@faker-js/faker";
import prisma from "database/db"
import supertest from "supertest"
import app from "../../src/app"
import { createBuyer } from "../factories/buyers.factory";
import { createExpensiveHouse, createHouse } from "../factories/houses-factory";
import { createNegotiation } from "../factories/negotiations-factory"
import { createRealtor } from "../factories/realtors.factory";

beforeAll(async () => {
    await prisma.negotiations.deleteMany()
})

afterAll(async () => {
    await prisma.negotiations.deleteMany()
})

describe('POST /negotiations', () => {

    it('should create a new negotiation', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        let negotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        expect(result.status).toBe(201)
    })

    it('should not create a new negotiation when buyer id is not valid', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        let negotiation = {
            buyerId: buyer.id+1,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        expect(result.status).toBe(404)
    })

    it('should not create a new negotiation when realtor id is not valid', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        let negotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id+1,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        expect(result.status).toBe(404)
    })

    it('should not create a new negotiation when house id is not valid', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        let negotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id+1,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        expect(result.status).toBe(404)
    })

    it('should not create a new negotiation when buyer balance is lower than house price', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createExpensiveHouse()

        let negotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        expect(result.status).toBe(402)
    })

    it('should not create a new negotiation if it already exists', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        let negotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        const doubledResult = await supertest(app).post('/negotiations').send(negotiation)

        expect(doubledResult.status).toBe(409)
    })

    it('should not create a new negotiation when body is not valid', async () => {

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        let negotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id
        }

        const result = await supertest(app).post('/negotiations').send(negotiation)

        expect(result.status).toBe(422)
    })

})

describe('GET /negotiations', () => {

    it('should get all negotiations', async () => {

        const result = await supertest(app).get('/negotiations')

        expect(result.status).toBe(200)

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    status: expect.any(String),
                    rating: expect.any(String),
                    realtors: expect.any(Object),
                    houses: expect.any(Object),
                    buyers: expect.any(Object)
                })
            ])
        )
    })

})

describe('GET /negotiations/:id', () => {

    it('should get negotiation by its id', async () => {
        const negotiation = await createNegotiation()

        const result = await supertest(app).get(`/negotiations/${negotiation.id}`)

        expect(result.status).toBe(200)

        expect(result.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                status: expect.any(String),
                rating: expect.any(String),
                realtors: expect.any(Object),
                houses: expect.any(Object),
                buyers: expect.any(Object)
            })
        )
    })

    it('should not get negotiation if its id doesnt exist', async () => {
        const negotiation = await createNegotiation()

        const result = await supertest(app).get(`/negotiations/${negotiation.id + 1}`)

        expect(result.status).toBe(404)
    })

})

describe('PUT /negotiations/:id', () => {

    it('should update a negotiation by its id', async () => {
        const negotiation = await createNegotiation()

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        const result = await supertest(app).put(`/negotiations/${negotiation.id}`).send({
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        })

        expect(result.status).toBe(200)
    })

    it('should not update negotiation if its id doesnt exist', async () => {
        const negotiation = await createNegotiation()

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        const result = await supertest(app).put(`/negotiations/${negotiation.id + 1}`).send({
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            status: 'on_going',
            rating: 'good'
        })

        expect(result.status).toBe(404)
    })

    it('should not update a negotiation when body is not valid', async () => {
        const negotiation = await createNegotiation()

        const buyer = await createBuyer()

        const realtor = await createRealtor()

        const house = await createHouse()

        const newNegotiation = {
            buyerId: buyer.id,
            realtorId: realtor.id,
            houseId: house.id,
            [faker.lorem.word()]: faker.lorem.word()
        }

        const result = await supertest(app).post('/negotiations').send(newNegotiation)

        expect(result.status).toBe(422)
    })

})

describe('DELETE /negotiations/:id', () => {

    it('should delete a negotiation by its id', async () => {
        const negotiation = await createNegotiation()

        const result = await supertest(app).delete(`/negotiations/${negotiation.id}`)

        expect(result.status).toBe(204)
    })

    it('should not delete a negotiation if its id doesnt exist', async () => {
        const negotiation = await createNegotiation()

        const result = await supertest(app).delete(`/negotiations/${negotiation.id + 1}`)

        expect(result.status).toBe(404)
    })

})