import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtInterface, LoginInterface } from '../interfaces/auth';
import { UserInterface } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath = 'http://192.168.43.60:8000';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse) {
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

  login(data: LoginInterface): Observable<JwtInterface> {
    const url = `${this.basePath}/login/`;
    return this.httpClient
      .post<JwtInterface>(url, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveToken(data: JwtInterface) {
    localStorage.setItem('token', data.access);
    localStorage.setItem('refresh', data.refresh);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token != null) {
      return true;
    }

    return false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['dashboard']);
  }
}
