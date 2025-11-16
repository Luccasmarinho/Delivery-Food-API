import z from "zod";

const schemaProducts = {
  products: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number(),
    image_url: z.string(),
  }),
};

export default schemaProducts;
