import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './home/transaction/transaction.component';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: AuthFormComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home/:userId', component: HomeComponent },
  { path: 'home/transaction/:accountId', component: TransactionComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
