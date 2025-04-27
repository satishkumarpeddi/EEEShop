export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  specs?: string[];
  createdAt: string;
}