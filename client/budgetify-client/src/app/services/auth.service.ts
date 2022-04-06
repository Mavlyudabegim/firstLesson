import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userId: string = '';
  constructor(private httpClient: HttpClient) {}
  private setToken(data: any): void {
    localStorage.setItem('token', data.token);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post('http://localhost:3000/api/login', {
        email,
        password,
      })
      .pipe(
        tap((res: any) => {
          this.setToken(res);
          this.userId = res.user.id;
        })
      );
  }
  public logout(): void {
    localStorage.removeItem('token');
  }
}
