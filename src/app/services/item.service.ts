import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemBestSellerInterface } from '../interfaces/sales';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  public bestSeller(): Observable<ItemBestSellerInterface[]> {
    this.baseService.clearParams();
    const url: string = `${this.baseService.baseUrl}/items/best_seller/`;
    return this.httpClient.get<ItemBestSellerInterface[]>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
