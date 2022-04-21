import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { AccountComponent } from './account/account.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditConfirmationComponent } from './dialogs/edit-confirmation/edit-confirmation.component';
import { PiggybankComponent } from './piggybank/piggybank.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    TransactionComponent,
    CreateAccountComponent,
    ConfirmationDialogComponent,
    EditConfirmationComponent,
    PiggybankComponent,
  ],
  providers: [EditConfirmationComponent, CreateAccountComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule, ReactiveFormsModule],
  exports: [HomeComponent],
  entryComponents: [EditConfirmationComponent],
})
export class HomeModule {}
