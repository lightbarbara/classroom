import faker from "@faker-js/faker";
import prisma from "database/db"
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import { Realtor } from "protocols/realtors.protocols"
import supertest from "supertest"
import app from "../../src/app"
import { createRealtor } from "../factories/realtors.factory";

beforeAll(async () => {
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
            salesCommission: faker.datatype.number()
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

        let newBuyer = {
            name: faker.name.findName(),
            cpf: realtor.cpf,
            salesCommission: faker.datatype.number()
        }

        const result = await supertest(app).post('/realtors').send(newBuyer)

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

        expect(result.body).toHaveLength(2)
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

        const result = await supertest(app).get(`/realtors/${realtor.id + 1}`)

        expect(result.status).toBe(404)
    })

})