import prisma from "database/db"
import { Realtor } from "protocols/realtors.protocols"
import supertest from "supertest"
import app from "../../src/app"

beforeAll(async () => {
    await prisma.realtors.deleteMany()
})

afterAll(async () => {
    await prisma.realtors.deleteMany()
})

describe('realtor tests', () => {

    it('should create a new realtor', async () => {
        const realtor: Realtor = {
            name: 'Beatriz',
            cpf: '23456789012',
            salesCommission: 0.1
        }

        const result = await supertest(app).post('/realtors').send(realtor)

        expect(result.status).toBe(201)
    })

    it('should not create a new realtor because of cpf validation', async () => {
        const realtor: Realtor = {
            name: 'Beatriz',
            cpf: '23456789012',
            salesCommission: 0.1
        }

        const result = await supertest(app).post('/realtors').send(realtor)

        expect(result.status).toBe(409)
    })


})