export interface ProductInterface {
  id: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
}

export interface ProductPaginationInterface {
  previous: string;
  next: string;
  results: ProductInterface[];
}

export class ProductSerializer implements ProductInterface {
  id: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
}

export class ProductPaginationSerializer implements ProductPaginationInterface {
  previous: string;
  next: string;
  results: ProductInterface[];
}
