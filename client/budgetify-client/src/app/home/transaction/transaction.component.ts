import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionModel } from '../../shared/models/transaction.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountModel } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/services/account.service';
@UntilDestroy()
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  public accountId: any;
  public transactions!: TransactionModel[];
  public accounts!: AccountModel[];
  public userId: string = '';
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {}

  public ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId');
    this.accountService
      .getOneAccount(this.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.userId = data.userId;
          this.accountService.getAccounts(this.userId).subscribe({
            next: (data) => {
              this.accounts = data;
            },
          });
        },
      });

    this.transactionService
      .getTransactions(this.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => (this.transactions = data),
      })
      .add();
  }
}
