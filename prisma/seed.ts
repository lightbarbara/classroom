import prisma from "../src/database/db"

async function main() {
    await prisma.buyers.createMany({
        data: [
            {
                "name": "barbara",
                "cpf": "12345678901",
                "balance": 60000
            },
            {
                "name": "luisa",
                "cpf": "23456789012",
                "balance": 60000
            },
            {
                "name": "giovana",
                "cpf": "34567890123",
                "balance": 60000
            }
        ]
    })

    await prisma.houses.createMany({
        data: [
            {
                "cep": "21853580",
                "price": 20000
            },
            {
                "cep": "21547980",
                "price": 50000
            },
            {
                "cep": "21354657",
                "price": 30000
            }
        ]
    })

    await prisma.realtors.createMany({
        data: [
            {
                "name": "bianca",
                "cpf": "45678901234",
                "salesCommission": 0.2
            },
            {
                "name": "roberta",
                "cpf": "56789012345",
                "salesCommission": 0.1
            },
            {
                "name": "clara",
                "cpf": "67890123456",
                "salesCommission": 0.15
            }
        ]
    })

    await prisma.negotiations.createMany({
        data: [
            {
                "houseId": 1,
                "buyerId": 1,
                "realtorId": 1,
                "status": "failed",
                "rating": "bad"
            },
            {
                "houseId": 2,
                "buyerId": 1,
                "realtorId": 3,
                "status": "on_going"
            },
            {
                "houseId": 1,
                "buyerId": 2,
                "realtorId": 1,
                "status": "bought",
                "rating": "good"
            }
        ]
    })
}

main()
    .then(() => {
        console.log('Registro feito com sucesso')
    })
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })