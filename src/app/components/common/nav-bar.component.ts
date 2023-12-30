import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, MenubarModule],
  template: `
    <p-menubar [model]="items">
      <ng-template pTemplate="start">
        <img
          src="assets/svg/main.svg"
          height="40"
          class="mr-2"
        />
      </ng-template>
      <ng-template pTemplate="end">
        @if (isLoggedIn()) {
          <div class="flex align-content-center justify-content-center">
          <button
            pButton
            pRipple
            label="Log Out"
            class="p-button-link"
            (click)="signOut()"
          ></button>
         
        </div>
        }@else {
          <div class="flex align-content-center justify-content-center">
          <button
            pButton
            pRipple
            label="Login"
            class="p-button-link"
            (click)="login()"
          ></button>
          <button
            pButton
            pRipple
            label="Register"
            class="p-button-link"
            (click)="register()"
          ></button>
        </div>
        }

        
        
      </ng-template>
    </p-menubar>
  `,
  styles: [
    `
      .p-button.p-button-link:not(:disabled):focus {
        box-shadow: none !important;
      }
      ::ng-deep .p-menubar{
        border: none !important;
      }
    `,
  ],
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  /**
   *
   */
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  signOut(){
    this.authService.signOut();
    this.router.navigate(['/login']);
  }
}
