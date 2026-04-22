export interface Product {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  description: string;
}
