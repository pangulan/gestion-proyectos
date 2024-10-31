// src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];