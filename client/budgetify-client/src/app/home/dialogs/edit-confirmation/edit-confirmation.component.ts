import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AccountModel } from 'src/app/shared/models/account.model';
import { CreateAccountComponent } from '../../create-account/create-account.component';
@UntilDestroy()
@Component({
  selector: 'app-edit-confirmation',
  templateUrl: './edit-confirmation.component.html',
  styleUrls: ['./edit-confirmation.component.scss'],
})
export class EditConfirmationComponent {
  public account!: AccountModel;
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });
  constructor(private dialogRef: MatDialogRef<EditConfirmationComponent>) {}

  public onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
