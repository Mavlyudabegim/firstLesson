import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionModel } from '../../shared/models/transaction.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  public accountId: any;
  public transactions!: TransactionModel[];
  public isIncome: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  public ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId');
    this.transactionService
      .getTransactions(this.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => (this.transactions = data),
        complete: () => {},
      })
      .add();
  }
}
