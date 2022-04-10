import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AccountModel } from '../shared/models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  public accounts: AccountModel[] = [];
  public account!: AccountModel;
  public activeAccount: AccountModel = this.accounts[0];
  private __refreshNeeded$ = new Subject<void>();
  constructor(private httpClient: HttpClient) {}
  public get refreshNeeded() {
    return this.__refreshNeeded$;
  }
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
  public postAccount(userId: string, account: AccountModel): Observable<any> {
    return this.httpClient
      .post(`http://localhost:3000/api/accounts/${userId}`, account, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap(() => {
          this.__refreshNeeded$.next();
        })
      );
  }
  public deleteAccount(accountId: string): Observable<any> {
    return this.httpClient
      .delete(`http://localhost:3000/api/accounts/${accountId}`)
      .pipe(
        tap(() => {
          this.__refreshNeeded$.next();
        })
      );
  }
  public editAccount(
    accountId: string,
    account: AccountModel
  ): Observable<any> {
    return this.httpClient
      .put(`http://localhost:3000/api/accounts/${accountId}`, account, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap(() => {
          this.__refreshNeeded$.next();
        })
      );
  }
  public getOneAccount(accountId: string): Observable<any> {
    return this.httpClient
      .get(`http://localhost:3000/api/accounts/${accountId}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.account = res;
          },
        })
      );
  }
  public ngOnInit(): void {}
}
