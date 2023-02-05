import prisma from "database/db"
import { House } from "protocols/houses.protocols"
import supertest from "supertest"
import app from "../../src/app"

beforeAll(async () => {
    await prisma.houses.deleteMany()
})

afterAll(async () => {
    await prisma.houses.deleteMany()
})

describe('house tests', () => {

    it('should create a new house', async () => {
        const house: House = {
            cep: '12345678',
            price: 30000
        }

        const result = await supertest(app).post('/houses').send(house)

        expect(result.status).toBe(201)
    })




})