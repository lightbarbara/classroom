import { buyers } from "@prisma/client";

export type Buyer = Omit<buyers, "id">