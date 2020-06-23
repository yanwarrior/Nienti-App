export interface CustomerInterface {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}


export interface CustomerPaginationInterface {
  next: string;
  previous: string;
  results: CustomerInterface[];
}


export class CustomerSerializer implements CustomerInterface {
  public id: number;
  public name: string;
  public address: string;
  public phone: string;
  public email: string;
}
