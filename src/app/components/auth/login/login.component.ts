import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  template: `<div class="grid">
    <div
      class="col-12 md:col-offset-4 lg:col-offset-4 grid p-5"
      [formGroup]="loginForm"
    >
      <div class="col-12 md:col-4 lg:col-4">
        <div class="field">
          <h3>Login</h3>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            autocomplete="off"
            formControlName="email"
            type="text"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            autocomplete="off"
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field">
          <div class="flex align-content-center justify-content-center">
            <button
              pButton
              pRipple
              label="Submit"
              class="p-button-success"
              (click)="onSubmit()"
            ></button>
          </div>
          <div class="flex align-content-end justify-content-end">
            <button pButton pRipple class="p-button-link">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> `,
  styles: [``],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/user-dashboard'])
    }
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((res) => {
      if (res?.message == 'success') {
        this.authService.storeToken(res?.data?.token);
        this.messageService.add({
          severity: 'success',
          summary: `Welcome ${res?.data?.firstName || 'guest'}!`,
        });
        if(this.authService.isUserAdmin()){
          this.router.navigate(['/admin-dashboard']);
        }else{
          this.router.navigate(['/user-dashboard']);
        }
      }
    });
  }

  ngOnDestroy(): void {}
}
