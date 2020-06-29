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
  sale_number: string;
  sale_date: string;
  total: number = 0;
  total_after: number =  0;
  discount: number = 0;
  tax: number = 0;
  pay: number = 0;
  change: number = 0;

  constructor() {
    this.calculates();
    this.generateSaleNumber();
  }

  public calculates(): void {
    this.total_after = (this.total - this.discount) + this.tax;
    this.change = 0;
    if (this.total_after > 0) {
      this.change = this.pay - this.total_after;
    }
  }

  public generateSaleNumber(): void {
    this.sale_number = (new Date().getTime()).toString(36).toUpperCase();
  }

  public isReady(): boolean {
    if (this.change >= 0 && this.total_after > 0) {
      return true;
    }

    return false;
  }

  public setSaleDateFromJSON(date: {year: string, month: string, day: string}) {
    this.sale_date = `${date.year}-${date.month}-${date.day}`;
  }
}

export interface SalePaginationInterface {
  next: string;
  previous: string;
  sales: SaleInterface[];
}

export class SalePaginationSerializer implements SalePaginationInterface {
  next: string;
  previous: string;
  sales: SaleSerializer[];
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

