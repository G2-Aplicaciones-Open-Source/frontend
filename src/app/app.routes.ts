import { Routes } from '@angular/router';
import { preventAuthGuard } from './iam/guards/prevent-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    canActivate: [preventAuthGuard],
    loadComponent: () => import('./iam/layout/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./iam/pages/sign-up/sign-up').then(m => m.SignUp)
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./iam/pages/sign-in/sign-in').then(m => m.SignIn)
      }
    ]
  }
];
