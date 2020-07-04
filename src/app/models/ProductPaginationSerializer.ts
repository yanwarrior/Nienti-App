import { ProductPaginationInterface, ProductSerializer } from './products';

export class ProductPaginationSerializer implements ProductPaginationInterface {
  previous: string;
  next: string;
  count: number;
  results: ProductSerializer[];


  public isEmpty(): boolean {
    return this.results.length == 0;
  }
}
