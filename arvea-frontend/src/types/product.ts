export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string;
};


export type ProductSection = {
  title: string;
  tabs: string[];
  products: Product[];
};