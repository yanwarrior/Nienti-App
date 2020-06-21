import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { UserInterface, UserSerializer } from '../interfaces/users';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSubject = new BehaviorSubject(new UserSerializer());

  constructor(
    private baseService: BaseService,
    private httpClient: HttpClient
  ) { }

  public get(): Observable<UserInterface> {
    const url: string = `${this.baseService.baseUrl}/users/profile/`;

    return this.httpClient.get<UserInterface>(url, this.baseService.httpOptions)
      .pipe(
        retry(2),
        catchError(this.baseService.handleError)
      );
  }

  public isUserSubjectAvailable() {
    if (this.userSubject.value.username) {
      return true;
    }
    return false;
  }

  public getUserSubject() {
    return this.userSubject.value;
  }

  public saveUser(user: UserInterface): void {
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('first_name', user.first_name);
    localStorage.setItem('last_name', user.last_name);
    localStorage.setItem('is_superuser', user.is_superuser ? '1':'0');
  }
}
