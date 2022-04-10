import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  public isHidden: boolean = false;
  public selectedCurrency: string = '$';
  public userId: string = '';
  public accountForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    currency: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private homeComponent: HomeComponent
  ) {}
  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  public hide(): void {
    this.isHidden = true;
  }
  public onSubmit(formRef: FormGroupDirective): void {
    this.userId = this.homeComponent.userId;
    this.accountService
      .postAccount(this.userId, formRef.value)
      .subscribe((res: any) => {
        console.log(res);
        formRef.resetForm();
      });
  }
}
