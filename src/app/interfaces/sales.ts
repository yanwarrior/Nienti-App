export interface SaleInterface {
  id: number;
  customer: number;
  user: number;
  sale_number: string;
  sale_date: string;
  total: number;
  total_after: number;
  discount: number;
  tax: number;
  pay: number;
  change: number;
}

export class SaleSerializer implements SaleInterface {
  id: number;
  customer: number;
  user: number;
  sale_number: string = '';
  sale_date: string = '';
  total: number = 0;
  total_after: number =  0;
  discount: number = 0;
  tax: number = 0;
  pay: number = 0;
  change: number = 0;
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

