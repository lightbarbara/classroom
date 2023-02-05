import faker from "@faker-js/faker";
import prisma from "database/db"
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import supertest from "supertest"
import app from "../../src/app"
import { createBuyer } from "../factories/buyers.factory"

beforeAll(async () => {
    await prisma.buyers.deleteMany()
})

afterAll(async () => {
    await prisma.buyers.deleteMany()
})

describe('POST /buyers', () => {

    it('should create a new buyer', async () => {
        let buyer = {
            name: faker.name.findName(),
            cpf: generateCPF(),
            balance: faker.datatype.number()
        }

        const result = await supertest(app).post('/buyers').send(buyer)

        expect(result.status).toBe(201)
    })

    it('should not create a new buyer when body is not valid', async () => {
        const buyer = {
            [faker.lorem.word()]: faker.lorem.word()
        }

        const result = await supertest(app).post('/buyers').send(buyer)

        expect(result.status).toBe(422)
    })

    it('should not create a new buyer because of cpf validation', async () => {
        let buyer = await createBuyer()

        delete buyer.id

        let newBuyer = {
            name: faker.name.findName(),
            cpf: buyer.cpf,
            balance: faker.datatype.number()
        }

        const result = await supertest(app).post('/buyers').send(newBuyer)

        expect(result.status).toBe(409)
    })

})

describe('GET /buyers', () => {

    it('should get all buyers', async () => {

        const result = await supertest(app).get('/buyers')

        expect(result.status).toBe(200)

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    cpf: expect.any(String),
                    balance: expect.any(Number)
                })
            ])
        )

        expect(result.body).toHaveLength(2)
    })

})

describe('GET /buyers/:id', () => {

    it('should get buyer by its id', async () => {
        const buyer = await createBuyer()

        const result = await supertest(app).get(`/buyers/${buyer.id}`)

        expect(result.status).toBe(200)

        expect(result.body).toEqual(buyer)
    })

    it('should not get buyer if its id doesnt exist', async () => {
        const buyer = await createBuyer()

        const result = await supertest(app).get(`/buyers/${buyer.id+1}`)

        expect(result.status).toBe(404)
    })

})

describe('PUT /buyers/:id', () => {

    it('should update a buyer by its id', async () => {
        const buyer = await createBuyer()

        const result = await supertest(app).put(`/buyers/${buyer.id}`).send({
            name: faker.name.findName(),
            cpf: generateCPF(),
            balance: faker.datatype.number()
        })

        expect(result.status).toBe(200)
    })

    it('should not update buyer if its id doesnt exist', async () => {
        const buyer = await createBuyer()

        const result = await supertest(app).put(`/buyers/${buyer.id + 1}`).send({
            name: faker.name.findName(),
            cpf: generateCPF(),
            balance: faker.datatype.number()
        })

        expect(result.status).toBe(404)
    })

    it('should not update buyer if its cpf update corresponds to another user', async () => {
        const buyer = await createBuyer()

        const newBuyer = await createBuyer()

        const result = await supertest(app).put(`/buyers/${newBuyer.id}`).send({
            name: faker.name.findName(),
            cpf: buyer.cpf,
            balance: faker.datatype.number()
        })

        expect(result.status).toBe(409)
    })

})

describe('DELETE /buyers/:id', () => {

    it('should delete a buyer by its id', async () => {
        const buyer = await createBuyer()

        const result = await supertest(app).delete(`/buyers/${buyer.id}`)

        expect(result.status).toBe(204)
    })

    it('should not delete a buyer if its id doesnt exist', async () => {
        const buyer = await createBuyer()

        const result = await supertest(app).delete(`/buyers/${buyer.id+1}`)

        expect(result.status).toBe(404)
    })

})