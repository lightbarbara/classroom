import { realtors } from "@prisma/client";

export type Realtor = Omit<realtors, "id">