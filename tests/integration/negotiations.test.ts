import prisma from "database/db"
import { Negotiation } from "protocols/negotiations.protocols"
import supertest from "supertest"
import app from "../../src/app"

beforeAll(async () => {
    await prisma.negotiations.deleteMany()
})

afterAll(async () => {
    await prisma.negotiations.deleteMany()
})

describe('negotiation tests', () => {

    it('should create a new negotiation', async () => {
        const negotiation: Negotiation = {
            buyerId: 1,
            realtorId: 1,
            houseId: 1,
            status: 'on_going',
            rating: 'good'
        }

        const result = await supertest(app).post('/houses').send(negotiation)

        expect(result.status).toBe(201)
    })




})