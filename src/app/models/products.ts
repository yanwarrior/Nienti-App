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
  count: number;
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
  count: number;
  results: ProductSerializer[];

  public isEmpty(): boolean {
    return this.results.length == 0;
  }
}