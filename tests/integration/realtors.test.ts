import faker from "@faker-js/faker";
import prisma from "database/db"
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import supertest from "supertest"
import app from "../../src/app"
import { createRealtor } from "../factories/realtors.factory";

beforeAll(async () => {
    await prisma.negotiations.deleteMany()
    await prisma.realtors.deleteMany()
})

afterAll(async () => {
    await prisma.realtors.deleteMany()
})

describe('POST /realtors', () => {

    it('should create a new realtor', async () => {
        let realtor = {
            name: faker.name.findName(),
            cpf: generateCPF(),
            salesCommission: faker.datatype.float({ min: 0, max: 1 })
        }

        const result = await supertest(app).post('/realtors').send(realtor)

        expect(result.status).toBe(201)
    })

    it('should not create a new realtor when body is not valid', async () => {
        const realtor = {
            [faker.lorem.word()]: faker.lorem.word()
        }

        const result = await supertest(app).post('/realtors').send(realtor)

        expect(result.status).toBe(422)
    })

    it('should not create a new realtor because of cpf validation', async () => {
        let realtor = await createRealtor()

        delete realtor.id

        let newRealtor = {
            name: faker.name.findName(),
            cpf: realtor.cpf,
            salesCommission: faker.datatype.float({ min: 0, max: 1 })
        }

        const result = await supertest(app).post('/realtors').send(newRealtor)

        expect(result.status).toBe(409)
    })

})

describe('GET /realtors', () => {

    it('should get all realtors', async () => {

        const result = await supertest(app).get('/realtors')

        expect(result.status).toBe(200)

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    cpf: expect.any(String),
                    salesCommission: expect.any(Number)
                })
            ])
        )
    })

})

describe('GET /realtors/:id', () => {

    it('should get realtor by its id', async () => {
        const realtor = await createRealtor()

        const result = await supertest(app).get(`/realtors/${realtor.id}`)

        expect(result.status).toBe(200)

        expect(result.body).toEqual(realtor)
    })

    it('should not get realtor if its id doesnt exist', async () => {
        const realtor = await createRealtor()

        const result = await supertest(app).get(`/realtors/${realtor.id + 1000}`)

        expect(result.status).toBe(404)
    })

})

describe('PUT /realtors/:id', () => {

    it('should update a realtor by its id', async () => {
        const realtor = await createRealtor()

        const result = await supertest(app).put(`/realtors/${realtor.id}`).send({
            name: faker.name.findName(),
            cpf: generateCPF(),
            salesCommission: faker.datatype.float({ min: 0, max: 1 })
        })

        expect(result.status).toBe(200)
    })

    it('should not update realtor if its id doesnt exist', async () => {
        const realtor = await createRealtor()

        const result = await supertest(app).put(`/realtors/${realtor.id + 1}`).send({
            name: faker.name.findName(),
            cpf: generateCPF(),
            salesCommission: faker.datatype.float({ min: 0, max: 1 })
        })

        expect(result.status).toBe(404)
    })

    it ('should not update realtor if its cpf update corresponds to another user', async () => {
        const realtor = await createRealtor()

        const newRealtor = await createRealtor()

        const result = await supertest(app).put(`/realtors/${newRealtor.id}`).send({
            name: faker.name.findName(),
            cpf: realtor.cpf,
            salesCommission: faker.datatype.float({ min: 0, max: 1 })
        })

        expect(result.status).toBe(409)
    })

    it('should not update a realtor when body is not valid', async () => {
        const realtor = createRealtor()
        
        const newRealtor = {
            [faker.lorem.word()]: faker.lorem.word()
        }

        const result = await supertest(app).post('/realtors').send(newRealtor)

        expect(result.status).toBe(422)
    })

})

describe('DELETE /realtors/:id', () => {

    it('should delete a realtor by its id', async () => {
        const realtor = await createRealtor()

        const result = await supertest(app).delete(`/realtors/${realtor.id}`)

        expect(result.status).toBe(204)
    })

    it('should not delete a realtor if its id doesnt exist', async () => {
        const realtor = await createRealtor()

        const result = await supertest(app).delete(`/realtors/${realtor.id + 1}`)

        expect(result.status).toBe(404)
    })

})