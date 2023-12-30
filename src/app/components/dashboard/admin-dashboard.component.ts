import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [],
  template: ` <p>Hello Logged in Admin.</p> `,
  styles: [],
})
export class AdminDashboardComponent implements OnInit {
  /**
   *
   */
  private router = inject(Router);

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
