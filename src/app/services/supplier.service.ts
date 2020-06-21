import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { SupplierPaginationInterface, SupplierInterface, SupplierSerializer } from '../interfaces/suppliers';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  all(): Observable<SupplierPaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/suppliers/`;
    return this.httpClient.get<SupplierPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  search(search: string): Observable<SupplierPaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/suppliers/`;
    this.baseService.httpOptions['params'] = new HttpParams().set('search', search);

    return this.httpClient.get<SupplierPaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  paginate(cursor: string): Observable<SupplierPaginationInterface> {
    return this.httpClient.get<SupplierPaginationInterface>(cursor, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  create(supplier: SupplierInterface): Observable<SupplierInterface> {
    const url: string = `${this.baseService.baseUrl}/suppliers/`;
    return this.httpClient.post<SupplierInterface>(url, supplier, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  update(supplier: SupplierInterface): Observable<SupplierInterface> {
    const url: string = `${this.baseService.baseUrl}/suppliers/${supplier.id}/`;
    return this.httpClient.put<SupplierInterface>(url, supplier, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  delete(id: number): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/suppliers/${id}/`;
    return this.httpClient.delete<SupplierInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      ); 
  }
}
