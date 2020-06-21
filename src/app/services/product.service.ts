import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPaginationInterface, ProductPaginationSerializer, ProductInterface } from '../interfaces/products';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  all(): Observable<ProductPaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/products/`;
    return this.httpClient.get<ProductPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  search(search: string): Observable<ProductPaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/products/`;
    this.baseService.httpOptions['params'] = new HttpParams().set('search', search);

    return this.httpClient.get<ProductPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  paginate(cursor: string): Observable<ProductPaginationInterface> {
    return this.httpClient.get<ProductPaginationInterface>(cursor, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  create(product: ProductInterface): Observable<ProductInterface> {
    const url: string = `${this.baseService.baseUrl}/products/`;
    return this.httpClient.post<ProductInterface>(url, product, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  update(product: ProductInterface): Observable<ProductInterface> {
    const url: string = `${this.baseService.baseUrl}/products/`;
    return this.httpClient.put<ProductInterface>(url, product, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/products/${id}/`;
    return this.httpClient.delete<ProductInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
