import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private setToken(data: any): void {
    localStorage.setItem('token', data.token);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
  public login(email: string, password: string) {
    return this.httpClient
      .post('http://localhost:3000/api/login', {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.setToken(res);
        })
      );
  }
  public logout(): void {
    localStorage.removeItem('token');
  }
}
