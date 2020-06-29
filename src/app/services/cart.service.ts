import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartInterface, CartPaginationInterface } from '../interfaces/carts';
import { retry, catchError, debounceTime } from 'rxjs/operators';
import { CartSummaryInterface } from '../interfaces/carts';
import { HandThumbsDown } from 'ngx-bootstrap-icons';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  all(): Observable<CartPaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/carts/`;
    return this.httpClient.get<CartPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  create(cart: CartInterface): Observable<CartInterface> {
    const url: string = `${this.baseService.baseUrl}/carts/`;
    return this.httpClient.post<CartInterface>(url, cart, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  update(cart: CartInterface): Observable<CartInterface> {
    const url: string = `${this.baseService.baseUrl}/carts/${cart.id}/`;
    return this.httpClient.put<CartInterface>(url, cart, this.baseService.httpOptions)
      .pipe(
        retry(2),
        debounceTime(1000),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/carts/${id}/`;
    return this.httpClient.delete<any>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  clear(): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/carts/clear/`;
    return this.httpClient.delete<any>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  summary(): Observable<CartSummaryInterface> {
    const url: string = `${this.baseService.baseUrl}/carts/summary/`;
    return this.httpClient.post<CartSummaryInterface>(url, {}, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
  
}
