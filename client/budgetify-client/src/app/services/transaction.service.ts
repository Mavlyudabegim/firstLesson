import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { TransactionModel } from '../shared/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transactions: TransactionModel[] = [];
  public transaction!: TransactionModel;
  private refreshNeeded$ = new Subject<void>();
  constructor(private httpClient: HttpClient) {}
  public get refreshNeeded() {
    return this.refreshNeeded$;
  }
  public getTransactions(accountId: string): Observable<any> {
    return this.httpClient
      .get(
        `http://localhost:3000/api/transactions/${accountId}/account-transactions`
      )
      .pipe(
        tap({
          next: (res: any) => {
            this.transactions = res;
          },
        })
      );
  }
  public getOneTransaction(transactionId: string): Observable<any> {
    return this.httpClient
      .get(`http://localhost:3000/api/transactions/${transactionId}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.transaction = res;
          },
        })
      );
  }
  public postTransaction(
    accountId: string,
    transaction: TransactionModel
  ): Observable<any> {
    return this.httpClient
      .post(
        `http://localhost:3000/api/transactions/${accountId}`,
        transaction,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }

  public deleteTransaction(transactionId: string): Observable<any> {
    return this.httpClient
      .delete(`http://localhost:3000/api/transactions/${transactionId}`)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }
  public editTransaction(
    transactionId: string,
    newTransaction: any
  ): Observable<any> {
    return this.httpClient
      .put(
        `http://localhost:3000/api/transactions/${transactionId}`,
        newTransaction
      )
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }
}
