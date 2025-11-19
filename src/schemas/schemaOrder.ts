import z from "zod";

const schemaOrder = {
  createOrder: z.object({
    items: z.array(
      z.object({
        productId: z.number().min(1),
        quantity: z.number().min(1),
      })
    ),
  }),
};

export default schemaOrder;
