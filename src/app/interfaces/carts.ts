export interface CartInterface {
  id: number;
  user: number;
  product: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
  quantity: number;
}

export interface CartPaginationInterface {
  next: string;
  previous: string;
  results: CartInterface[];
}

export class CartSerializer implements CartInterface {
  id: number;
  user: number;
  product: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
  quantity: number;
}

