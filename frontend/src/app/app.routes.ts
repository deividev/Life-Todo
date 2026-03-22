import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'today', 
    pathMatch: 'full' 
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/shell.component').then(m => m.ShellComponent),
    children: [
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
