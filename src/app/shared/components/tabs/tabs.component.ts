import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-background pb-20">
      <main class="max-w-lg mx-auto px-4 py-6">
        <router-outlet />
      </main>
      
      <nav class="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div class="max-w-lg mx-auto flex">
          <a 
            routerLink="/app/today" 
            routerLinkActive="text-primary border-t-2 border-primary"
            [routerLinkActiveOptions]="{exact: true}"
            class="flex-1 py-4 flex flex-col items-center gap-1 text-text-muted transition"
          >
            <span class="text-xl">📅</span>
            <span class="text-xs font-medium">Hoy</span>
          </a>
          <a 
            routerLink="/app/weekly" 
            routerLinkActive="text-primary border-t-2 border-primary"
            class="flex-1 py-4 flex flex-col items-center gap-1 text-text-muted transition"
          >
            <span class="text-xl">📊</span>
            <span class="text-xs font-medium">Semanal</span>
          </a>
          <a 
            routerLink="/app/progress" 
            routerLinkActive="text-primary border-t-2 border-primary"
            class="flex-1 py-4 flex flex-col items-center gap-1 text-text-muted transition"
          >
            <span class="text-xl">📈</span>
            <span class="text-xs font-medium">Progreso</span>
          </a>
          <button 
            (click)="signOut()"
            class="flex-1 py-4 flex flex-col items-center gap-1 text-text-muted hover:text-danger transition"
          >
            <span class="text-xl">🚪</span>
            <span class="text-xs font-medium">Salir</span>
          </button>
        </div>
      </nav>
    </div>
  `
})
export class TabsComponent {
  private authService = inject(AuthService);

  async signOut() {
    await this.authService.signOut();
  }
}
