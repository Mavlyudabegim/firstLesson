import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AccountModel } from '../shared/models/account.model';
const account_url = `http://localhost:3000/api/accounts`;
@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  public accounts: AccountModel[] = [];
  public account!: AccountModel;
  public activeAccount: AccountModel = this.accounts[0];
  private refreshNeeded$ = new Subject<void>();
  constructor(private httpClient: HttpClient) {}
  public get refreshNeeded() {
    return this.refreshNeeded$;
  }
  public getAccounts(userId: string): Observable<any> {
    return this.httpClient.get(`${account_url}/${userId}/user-accounts`).pipe(
      tap({
        next: (res: any) => {
          this.accounts = res;
        },
      })
    );
  }
  public postAccount(userId: string, account: AccountModel): Observable<any> {
    return this.httpClient
      .post(`${account_url}/${userId}`, account, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }
  public deleteAccount(accountId: string): Observable<any> {
    return this.httpClient.delete(`${account_url}/${accountId}`).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }
  public editAccount(
    accountId: string,
    account: AccountModel
  ): Observable<any> {
    return this.httpClient
      .put(`${account_url}/${accountId}`, account, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }
  public getOneAccount(accountId: string): Observable<any> {
    return this.httpClient.get(`${account_url}/${accountId}`).pipe(
      tap({
        next: (res: any) => {
          this.account = res;
        },
      })
    );
  }
  public ngOnInit(): void {}
}
