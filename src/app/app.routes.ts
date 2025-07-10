import { Routes } from '@angular/router';
import { authGuard } from './iam/guards/auth.guard';
import { preventAuthGuard } from './iam/guards/prevent-auth.guard';
import {agencyAuthGuard} from './iam/guards/agency-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/tourist-layout/tourist-layout').then(m => m.TouristLayout),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./public/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('../app/profiles/pages/favorites/favorites').then(m => m.Favorites)
      },
      {
        path: 'cart',
        loadComponent: () => import('../app/profiles/pages/cart/cart').then(m => m.Cart)
      },
      {
        path: 'bookings',
        loadComponent: () => import('./bookings/pages/bookings').then(m => m.Bookings)
      },
      {
        path: 'experience-detail/:id',
        loadComponent: () =>
          import('../app/experience-detail/pages/experience-detail/experience-detail.component')
            .then(m => m.ExperienceDetailComponent)
      }
    ]
  },
  {
    path: 'agency',
    canActivate: [agencyAuthGuard],
    loadComponent: () =>
      import('./layouts/agency-layout/agency-layout').then(m => m.AgencyLayout),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./public/pages/home-agency/home-agency').then(m => m.HomeAgency)
      }
    ]
  },
  {
    path: '',
    canActivate: [preventAuthGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./iam/pages/sign-up/sign-up').then(m => m.SignUp)
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./iam/pages/sign-in/sign-in').then(m => m.SignIn)
      }
    ]
  },
  {
    path: '**',
    loadComponent: ()=>
      import('./public/pages/page-not-found/page-not-found').then(m => m.PageNotFound),
  }
];
