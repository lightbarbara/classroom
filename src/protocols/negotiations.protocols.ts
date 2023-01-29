import { negotiations } from "@prisma/client";

export type Negotiation = Omit<negotiations, "id">