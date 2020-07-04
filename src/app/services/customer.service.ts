import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerPaginationInterface, CustomerInterface } from '../interfaces/customers';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  all(): Observable<CustomerPaginationInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/customers/`;
    return this.httpClient.get<CustomerPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  search(search: string): Observable<CustomerPaginationInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/customers/`;
    this.baseService.httpOptions['params'] = new HttpParams().set('search', search);

    return this.httpClient.get<CustomerPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  paginate(cursor: string): Observable<CustomerPaginationInterface> {
    this.baseService.clearParams();
    return this.httpClient.get<CustomerPaginationInterface>(cursor, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  create(customer: CustomerInterface): Observable<CustomerInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/customers/`;
    return this.httpClient.post<CustomerInterface>(url, customer, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  update(customer: CustomerInterface): Observable<CustomerInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/customers/${customer.id}/`;
    return this.httpClient.put<CustomerInterface>(url, customer, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<any> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/customers/${id}/`;
    return this.httpClient.delete<any>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
