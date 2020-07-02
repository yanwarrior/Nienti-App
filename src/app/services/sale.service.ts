import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SaleInterface, SaleSerializer, SalePaginationInterface, SaleReportSerializer } from '../interfaces/sales';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  public all(): Observable<SalePaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/sales/`;
    return this.httpClient.get<SalePaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public search(search: string): Observable<SalePaginationInterface> {
    const url: string = `${this.baseService.baseUrl}/sales/`;
    this.baseService.httpOptions['params'] = new HttpParams().set('search', search);

    return this.httpClient.get<SalePaginationInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public paginate(cursor: string): Observable<SalePaginationInterface> {
    return this.httpClient.get<SalePaginationInterface>(cursor, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public create(sale: SaleInterface): Observable<SaleSerializer> {
    const url: string = `${this.baseService.baseUrl}/sales/`;
    return this.httpClient.post<SaleSerializer>(url, sale, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public invoice(id: number): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/sales/${id}/invoice/`;
    return this.httpClient.post<any>(url, null, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public deliveryOrders(id: number): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/sales/${id}/delivery_orders/`;
    return this.httpClient.post<any>(url, null, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public reports(periodictDate: SaleReportSerializer, search: string): Observable<any> {
    const url: string = `${this.baseService.baseUrl}/sales/reports/`;
    
    this.baseService.httpOptions['params'] = new HttpParams()
      .set('search', search)
      .set('sale_date__gte', periodictDate.start_date)
      .set('sale_date__lte', periodictDate.end_date);

    return this.httpClient.get<any>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
