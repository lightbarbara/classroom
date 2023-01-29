import prisma from "../src/database/db.js"

async function main() {
    await prisma.buyers.createMany({
        data: [
            {
                "name": "barbara",
                "balance": 0
            },
            {
                "name": "luisa",
                "balance": 0
            },
            {
                "name": "giovana",
                "balance": 0
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
                "salesCommission": 0.2
            },
            {
                "name": "roberta",
                "salesCommission": 0.1
            },
            {
                "name": "clara",
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