import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard.component';
import { UploadDataComponent } from './components/admin/upload-data.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard]},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard]},
  {path: 'upload-data', component: UploadDataComponent, canActivate: [AdminGuard]},
];
