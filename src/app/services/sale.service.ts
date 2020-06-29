import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { SaleInterface } from '../interfaces/sales';
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

  public create(sale: SaleInterface): Observable<SaleInterface> {
    const url: string = `${this.baseService.baseUrl}/sales/`;
    return this.httpClient.post<SaleInterface>(url, sale, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
