export interface CartInterface {
  id: number;
  user: number;
  product: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
  quantity: number;

  isValidStock(): boolean;
  getSubtotal(): number;
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

  public isValidStock() {
    if (this.stock && this.stock == 0) {
      return false;
    }

    if (this.stock && (this.stock - this.quantity) <= 0) {
      return false;
    }

    return true;
  }
}

