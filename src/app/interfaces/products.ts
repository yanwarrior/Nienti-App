export interface ProductInterface {
  id: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
}

export class ProductSerializer {
  id: number = 0;
  name: string = '';
  unit: string = '';
  price: number = 0;
  stock: number = 0;
}

export interface ProductPaginationInterface {
  previous: string;
  next: string;
  count: number;
  results: ProductInterface[];
}


