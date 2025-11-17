import { Decimal } from "@prisma/client/runtime/library";

export interface IProducts {
  name: string;
  description?: string | null;
  price: Decimal;
  image_url: string;
  createdAt?: Date;
}
