export interface SupplierInterface {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface SupplierPaginationInterface {
  next: string;
  previous: string;
  results: SupplierInterface[];
}


export class SupplierSerializer implements SupplierInterface {
  public id: number;
  public name: string;
  public phone: string;
  public address: string;
}

