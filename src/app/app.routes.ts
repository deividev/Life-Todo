import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'app',
    loadComponent: () => import('./shared/components/tabs/tabs.component').then(m => m.TabsComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'today',
        pathMatch: 'full'
      },
      {
        path: 'today',
        loadComponent: () => import('./features/today/today.component').then(m => m.TodayComponent)
      },
      {
        path: 'weekly',
        loadComponent: () => import('./features/weekly/weekly.component').then(m => m.WeeklyComponent)
      },
      {
        path: 'progress',
        loadComponent: () => import('./features/progress/progress.component').then(m => m.ProgressComponent)
      }
    ]
  }
];
