import { ProductInterface } from './products';

export interface CartInterface {
  id: number;
  user: number;
  product: number;
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
  subtotal: number;

  public productToCart(product: ProductInterface): CartSerializer {
    this.product = product.id;
    this.name = product.name;
    this.unit = product.unit;
    this.price = product.price;
    this.stock = product.stock;
    this.quantity = 1;
    this.subtotal = 1 * product.price;

    return this;
  }
}

