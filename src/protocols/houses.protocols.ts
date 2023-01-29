import { houses } from "@prisma/client";

export type House = Omit<houses, "id">