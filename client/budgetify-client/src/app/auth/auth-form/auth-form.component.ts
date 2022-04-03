import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  public loginErrorMessage: string = '';
  public isPasswordVisible: boolean = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  public onSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (userData) => {
        this.loginErrorMessage = '';
        this.router.navigateByUrl('/home');
      },
      error: (e) => (this.loginErrorMessage = e.error.message),
    });
  }
  public togglePass(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
