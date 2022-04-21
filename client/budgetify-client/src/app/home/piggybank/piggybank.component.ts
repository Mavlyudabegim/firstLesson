import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from 'src/app/services/account.service';
import { PiggybankService } from 'src/app/services/piggybank.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { PiggybankModel } from 'src/app/shared/models/piggybank.model';
import { TransactionComponent } from '../transaction/transaction.component';
@UntilDestroy()
@Component({
  selector: 'app-piggybank',
  templateUrl: './piggybank.component.html',
  styleUrls: ['./piggybank.component.scss'],
})
export class PiggybankComponent implements OnInit {
  public accountId: string = '';
  public currency: string = '';
  public piggybankForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    goalAmount: new FormControl(''),
  });
  public piggybanks!: PiggybankModel[];
  constructor(
    private transactionComponent: TransactionComponent,
    private accountService: AccountService,
    private piggybankService: PiggybankService
  ) {}

  public ngOnInit(): void {
    this.accountId = this.transactionComponent.accountId;
    this.piggybankService.refreshNeeded.subscribe(() => {
      this.getCurrency();
    });
    this.getCurrency();
    this.piggybankService.refreshNeeded.subscribe(() => {
      this.getPiggybanks();
    });
    this.getPiggybanks();
  }
  public getCurrency(): void {
    this.accountService
      .getOneAccount(this.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.currency = data.currency;
        },
      });
  }
  public getPiggybanks(): void {
    this.piggybankService
      .getPiggybanks(this.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => (this.piggybanks = data),
      })
      .add();
  }

  public onSubmit(formRef: FormGroupDirective): void {
    this.piggybankService
      .postPiggybank(this.accountId, formRef.value)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        formRef.resetForm();
      });
  }
}
