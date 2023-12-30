import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule],
  template: `
    <div class="grid">
      <div
        class="col-12 md:col-offset-4 lg:col-offset-4 p-5"
        [formGroup]="registerForm"
      >
        <div class="col-12 md:col-4 lg:col-4">
          <div class="field">
            <h3>Register</h3>
          </div>
          <div class="flex">
            <div class="field pr-5">
              <label for="firstName">First Name</label>
              <input
                id="firstName"
                autocomplete="off"
                formControlName="firstName"
                type="text"
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div class="field">
              <label for="lastName">Last Name</label>
              <input
                id="lastName"
                autocomplete="off"
                formControlName="lastName"
                type="text"
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
          </div>
          <div class="field">
            <label for="password">Phone Number</label>
            <input
              id="phoneNumber"
              type="number"
              formControlName="phoneNumber"
              autocomplete="off"
              class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
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
            <label for="password">Confirm Password</label>
            <input
              id="confirm_password"
              type="password"
              formControlName="confirmPassword"
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
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  /**
   *
   */
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
  }

  onSubmit() {
    const data = this.registerForm.value;
    data.phoneNumber = data.phoneNumber.toString();
    this.authService.register(data).subscribe((res) => {
      if (res?.message == 'success') {
        this.messageService.add({
          severity: 'success',
          summary: `Welcome ${
            res?.data?.firstName || 'guest'
          }! to JK marketing`,
        });
      }
      console.log(res);
    });
  }
}
