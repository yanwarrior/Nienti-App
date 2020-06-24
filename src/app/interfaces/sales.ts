export interface SaleInterface {
  id: number;
  sale_number: number;
  sale_date: number;
  note: string;
  total: number;
  pay: number;
  change: number;
  user: number;
  tax: number;
  discount: number;
}

export interface SalePaginationInterface {
  next: string;
  previous: string;
  sales: SaleInterface[];
}

export interface ItemInterface {
  id: number;
  product: number;
  sale: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

export interface ItemPaginationInterface {
  next: string;
  previous: string;
  items: ItemInterface[];
}

export interface CartInterface {
  id: number;
  product: number;
  user: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
  quantity: number;
  subtotal: number;
}

export interface CartPaginationInterface {
  next: string;
  previous: string;
  carts: CartInterface[];
}

