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

export interface ProductFilterInterface {
  stock__gte?: number;
  stock__lte?: number;
  stock__exact?: number;
}

export class ProductFilterSerializer implements ProductFilterInterface {
  stock__gte?: number;
  stock__lte?: number;
  stock__exact?: number;
}
