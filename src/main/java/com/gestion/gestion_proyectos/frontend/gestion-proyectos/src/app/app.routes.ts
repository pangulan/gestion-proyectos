// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./features/proyectos/proyectos.module')
      .then(m => m.ProyectosModule)
  },
  {
    path: 'tareas',
    loadChildren: () => import('./features/tareas/tareas.module')
      .then(m => m.TareasModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./features/empleados/empleados.module')
      .then(m => m.EmpleadosModule)
  }
];