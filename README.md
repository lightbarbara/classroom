# Real State

Back-end for realtors and buyers keep their negotiations on track.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. And then you just have to run

```bash
npm start
```

## Routes

### 1. Create buyer

```bash
POST /buyers
```

#### Body
```bash
{
    "name": "barbara",
    "cpf": "12345678901",
    "balance": 0
}
```

### 2. Get buyers

```bash
GET /buyers
```

### 3. Get buyer by id

```bash
GET /buyers/:id
```

### 4. Update buyer

```bash
PUT /buyers/:id
```

#### Body
```bash
{
    "name": "barbara",
    "cpf": "12345678901",
    "balance": 0
}
```

### 5. Delete buyer

```bash
DELETE /buyers/:id
```

### 6. Create realtor

```bash
POST /realtors
```

#### Body
```bash
{
    "name": "barbara",
    "cpf": "12345678901",
    "salesCommission": 0.2
}
```

### 7. Get realtors

```bash
GET /realtors
```

### 8. Get realtor by id

```bash
GET /realtors/:id
```

### 9. Update realtor

```bash
PUT /realtors/:id
```

#### Body
```bash
{
    "name": "barbara",
    "cpf": "12345678901",
    "salesCommission": 0.2
}
```

### 10. Delete realtor

```bash
DELETE /realtors/:id
```

### 11. Create house

```bash
POST /houses
```

#### Body
```bash
{
    "cep": "12345678",
    "price": 0
}
```

### 12. Get houses

```bash
GET /houses
```

### 13. Get house by id

```bash
GET /houses/:id
```

### 14. Update house

```bash
PUT /houses/:id
```

#### Body
```bash
{
    "cep": "12345678",
    "price": 0
}
```

### 15. Delete house

```bash
DELETE /houses/:id
```

### 16. Create negotiation

```bash
POST /negotiations
```

#### Body
```bash
{
    "houseId": 1,
    "buyerId": 1,
    "realtorId": 1,
    "status": "on_going"
}

{
    "houseId": 1,
    "buyerId": 1,
    "realtorId": 1,
    "status": "on_going",
    "rating": "good"
}
```

### 17. Get negotiations

```bash
GET /negotiations
```

### 18. Get negotiation by id

```bash
GET /negotiations/:id
```

### 19. Update negotiation

```bash
PUT /negotiations/:id
```

#### Body
```bash
{
    "houseId": 1,
    "buyerId": 1,
    "realtorId": 1,
    "status": "on_going"
}

{
    "houseId": 1,
    "buyerId": 1,
    "realtorId": 1,
    "status": "on_going",
    "rating": "good"
}
```

### 20. Delete negotiation

```bash
DELETE /negotiations/:id
```