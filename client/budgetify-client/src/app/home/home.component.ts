import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AccountModel } from '../shared/models/account.model';
import { AccountService } from '../services/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { TransactionComponent } from './transaction/transaction.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public selectedCurrency: string = '$';
  public accounts!: AccountModel[];
  public userId: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}
  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.accountService
      .getAccounts(this.userId)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (data) => (this.accounts = data),
      });
  }
}
