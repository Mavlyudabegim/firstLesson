import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TransactionModel } from '../shared/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public transaction: TransactionModel[] = [];
  constructor(private httpClient: HttpClient) {}
  public getTransactions(transactionId: string): Observable<any> {
    return this.httpClient
      .get(
        `http://localhost:3000/api/transactions/${transactionId}/account-transactions`
      )
      .pipe(
        tap({
          next: (res: any) => {
            this.transaction = res;
          },
        })
      );
  }
}
