import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public baseUrl: string = 'http://192.168.43.60:8000';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured: ', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status},` + 
        `body was: ${error.error}`
      );
    }

    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
