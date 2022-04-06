import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AccountModel } from './account/account.model';
import { AccountService } from '../services/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { TransactionComponent } from './transaction/transaction.component';

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
  public get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  public ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.accountService.getAccounts(this.userId).subscribe({
      next: (data) => (this.accounts = data),
      complete: () => {
        console.log(this.accounts);
      },
    });
  }
}
