import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PiggybankModel } from '../shared/models/piggybank.model';
const piggybank_url = `http://localhost:3000/api/piggybanks`;
@Injectable({
  providedIn: 'root',
})
export class PiggybankService {
  private refreshNeeded$ = new Subject<void>();
  public piggybanks!: PiggybankModel[];
  constructor(private httpClient: HttpClient) {}
  public get refreshNeeded() {
    return this.refreshNeeded$;
  }
  public postPiggybank(
    accountId: string,
    piggybank: PiggybankModel
  ): Observable<any> {
    return this.httpClient
      .post(`${piggybank_url}/${accountId}`, piggybank, {
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
  public getPiggybanks(accountId: string): Observable<any> {
    return this.httpClient
      .get(`${piggybank_url}/${accountId}/account-piggybanks`)
      .pipe(
        tap({
          next: (res: any) => {
            this.piggybanks = res;
          },
        })
      );
  }
}
