import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionModel } from '../../shared/models/transaction.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountModel } from 'src/app/shared/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@UntilDestroy()
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  public accountId: any;
  public transactions!: TransactionModel[];
  public transaction!: TransactionModel;
  public filteredTransactions!: TransactionModel[];
  public accounts!: AccountModel[];
  public account!: AccountModel;
  public currency: string = '';
  public userId: string = '';
  public selected: boolean = true;
  public image!: any;
  public categoryList: string[] = [
    'Accomodation',
    'Home',
    'Car',
    'Education',
    'Loan',
    'Tax',
  ];
  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    imgLink: new FormControl(''),
    transactionAmount: new FormControl(''),
    paymentDate: new FormControl(''),
    type: new FormControl(''),
    categories: new FormControl(''),
  });
  public transactionEditForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    imgLink: new FormControl(''),
    transactionAmount: new FormControl(''),
    paymentDate: new FormControl(''),
    type: new FormControl(''),
    categories: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId');
    this.transactionService.refreshNeeded.subscribe(() => {
      this.getTransactions();
    });
    this.getTransactions();
  }

  public getTransactions(): void {
    this.accountService
      .getOneAccount(this.accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => {
          this.account = data;
          this.currency = data.currency;
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
  public getOneTransaction(transactionId: string): void {
    this.transactionService
      .getOneTransaction(transactionId)
      .pipe(untilDestroyed(this))
      .subscribe({ next: (data) => (this.transaction = data) });
  }
  public sortByIncome(): void {
    this.filteredTransactions = this.transactions.filter((el) => {
      return el.type === 'Income';
    });
  }
  public sortByExpense(): void {
    this.filteredTransactions = this.transactions.filter((el) => {
      return el.type === 'Expense';
    });
  }
  public selectCategory(): void {
    this.selected = !this.selected;
  }
  public selectImage(event: any): void {
    const file = event.target.files[0];
    this.image = file;
  }
  public onSubmit(formRef: FormGroupDirective): void {
    if (!formRef.value.type) {
      formRef.value.type = 'Expense';
    }
    formRef.value.imgLink = this.image;
    this.transactionService
      .postTransaction(this.accountId, formRef.value)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        formRef.resetForm();
      });
  }
  public onEditSubmit(
    transactionId: string,
    formRef: FormGroupDirective
  ): void {
    formRef.value.imgLink = this.image;
    this.transactionService
      .editTransaction(transactionId, formRef.value)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        formRef.resetForm();
      });
  }
  public deleteTransaction(transactionId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No',
        },
      },
    });
    const snack = this.snackBar;
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.transactionService.deleteTransaction(transactionId).subscribe();
          snack.dismiss();
          const a = document.createElement('a');
          a.click();
          a.remove();
          snack.dismiss();
          this.snackBar.open('Account successfully has been deleted', '', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['green-snackbar'],
          });
        }
      });
  }
  public editTransaction(
    transactionId: string,
    formRef: FormGroupDirective
  ): void {
    this.transactionService
      .editTransaction(transactionId, formRef)
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        formRef.resetForm();
      });
  }
}
