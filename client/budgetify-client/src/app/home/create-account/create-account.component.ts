import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AccountService } from 'src/app/services/account.service';
import { AccountModel } from 'src/app/shared/models/account.model';
import { HomeComponent } from '../home.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditConfirmationComponent } from '../dialogs/edit-confirmation/edit-confirmation.component';
@UntilDestroy()
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  public selectedCurrency: string = '$';
  public accounts!: AccountModel[];
  public account!: AccountModel;
  public userId: string = '';
  constructor(
    private homeComponent: HomeComponent,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  public getAllAccounts(): void {
    this.userId = this.homeComponent.userId;
    this.accountService
      .getAccounts(this.userId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data: any) => (this.accounts = data),
      });
  }
  public ngOnInit(): void {
    this.accountService.refreshNeeded.subscribe(() => {
      this.getAllAccounts();
    });
    this.getAllAccounts();
  }
  public deleteAccount(accountId: string): void {
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
          this.accountService.deleteAccount(accountId).subscribe();
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

  public getOneAccount(accountId: string): any {
    this.accountService
      .getOneAccount(accountId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data: any) => (this.account = data),
      });
  }
  public openEditDialog(accountId: string): void {
    const dialogRef = this.dialog.open(EditConfirmationComponent);
    this.getOneAccount(accountId);
    this.accountService
      .editAccount(accountId, this.account)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
