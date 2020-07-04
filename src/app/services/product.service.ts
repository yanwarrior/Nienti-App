import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPaginationInterface, ProductInterface, ProductFilterInterface, ProductFilterSerializer} from '../interfaces/products';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) {}

  all(): Observable<ProductPaginationInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/`;
    return this.httpClient.get<ProductPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  choices(): Observable<ProductPaginationInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/choices/`;
    return this.httpClient.get<ProductPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  search(search: string, filter?: ProductFilterSerializer): Observable<ProductPaginationInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/`;

    if (filter) {
      this.baseService.httpOptions['params'] = new HttpParams()
        .set('search', search)
        .set('stock__gte', filter.stock__gte)
        .set('stock__lte', filter.stock__lte)
        .set('stock__exact', filter.stock__exact)
    } else {
      this.baseService.httpOptions['params'] = new HttpParams().set('search', search);
    }

    return this.httpClient.get<ProductPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  searchChoices(search: string): Observable<ProductPaginationInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/choices/`;
    this.baseService.httpOptions['params'] = new HttpParams().set('search', search);

    return this.httpClient.get<ProductPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  paginate(cursor: string): Observable<ProductPaginationInterface> {
    this.baseService.clearParams();
    console.log(cursor);
    
    return this.httpClient.get<ProductPaginationInterface>(cursor, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  create(product: ProductInterface): Observable<ProductInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/`;
    delete this.baseService.httpOptions['params'];
    return this.httpClient.post<ProductInterface>(url, product, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  update(product: ProductInterface): Observable<ProductInterface> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/${product.id}/`;
    delete this.baseService.httpOptions['params'];
    return this.httpClient.put<ProductInterface>(url, product, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<any> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/products/${id}/`;
    return this.httpClient.delete<ProductInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}