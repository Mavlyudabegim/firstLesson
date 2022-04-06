import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AccountModel } from '../home/account/account.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  public accounts: AccountModel[] = [];
  public activeAccount: AccountModel = this.accounts[0];

  constructor(private httpClient: HttpClient) {}

  public getAccounts(userId: string): Observable<any> {
    return this.httpClient
      .get(`http://localhost:3000/api/accounts/${userId}/user-accounts`)
      .pipe(
        tap({
          next: (res: any) => {
            this.accounts = res;
          },
        })
      );
  }
  public postAccount(userId: string, account: FormGroup): Observable<any> {
    return this.httpClient.post(
      `http://localhost:3000/api/accounts/${userId}`,
      account,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  ngOnInit(): void {}
}
