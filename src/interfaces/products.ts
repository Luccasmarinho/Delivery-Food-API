export interface IProducts {
    name: string;
    description?: string | null;
    price: number;
    image_url: string;
    createdAt?: Date;
  }