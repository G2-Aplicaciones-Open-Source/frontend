import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { ProfileComponent } from './public/pages/profile/profile.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent },
];
