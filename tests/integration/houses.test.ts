import faker from "@faker-js/faker";
import prisma from "database/db"
import { House } from "protocols/houses.protocols"
import supertest from "supertest"
import app from "../../src/app"
import { createHouse } from "../factories/houses-factory";

beforeAll(async () => {
    await prisma.negotiations.deleteMany()
    await prisma.houses.deleteMany()
})

afterAll(async () => {
    await prisma.houses.deleteMany()
})

describe('POST /houses', () => {

    it('should create a new house', async () => {
        let house: House = {
            cep: '12345678',
            price: faker.datatype.number()
        }

        const result = await supertest(app).post('/houses').send(house)

        expect(result.status).toBe(201)
    })

    it('should not create a new house when body is not valid', async () => {
        const house = {
            [faker.lorem.word()]: faker.lorem.word()
        }

        const result = await supertest(app).post('/houses').send(house)

        expect(result.status).toBe(422)
    })

})

describe('GET /houses', () => {

    it('should get all houses', async () => {

        const result = await supertest(app).get('/houses')

        expect(result.status).toBe(200)

        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    cep: expect.any(String),
                    price: expect.any(Number)
                })
            ])
        )
    })

})

describe('GET /houses/:id', () => {

    it('should get house by its id', async () => {
        const house = await createHouse()

        const result = await supertest(app).get(`/houses/${house.id}`)

        expect(result.status).toBe(200)

        expect(result.body).toEqual(house)
    })

    it('should not get house if its id doesnt exist', async () => {
        const house = await createHouse()

        const result = await supertest(app).get(`/houses/${house.id + 1000}`)

        expect(result.status).toBe(404)
    })

})

describe('PUT /houses/:id', () => {

    it('should update a house by its id', async () => {
        const house = await createHouse()

        const result = await supertest(app).put(`/houses/${house.id}`).send({
            cep: '12345678',
            price: faker.datatype.number()
        })

        expect(result.status).toBe(200)
    })

    it('should not update house if its id doesnt exist', async () => {
        const house = await createHouse()

        const result = await supertest(app).put(`/houses/${house.id + 1}`).send({
            cep: '12345678',
            price: faker.datatype.number()
        })

        expect(result.status).toBe(404)
    })

    it('should not update a house when body is not valid', async () => {
        const house = createHouse()

        const newHouse = {
            [faker.lorem.word()]: faker.lorem.word()
        }

        const result = await supertest(app).post('/houses').send(newHouse)

        expect(result.status).toBe(422)
    })

})

describe('DELETE /houses/:id', () => {

    it('should delete a house by its id', async () => {
        const house = await createHouse()

        const result = await supertest(app).delete(`/houses/${house.id}`)

        expect(result.status).toBe(204)
    })

    it('should not delete a house if its id doesnt exist', async () => {
        const house = await createHouse()

        const result = await supertest(app).delete(`/houses/${house.id + 1}`)

        expect(result.status).toBe(404)
    })

})