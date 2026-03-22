import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-background pb-24 safe-area-bottom">
      <header class="bg-surface border-b border-border/50 sticky top-0 z-10">
        <div class="max-w-lg mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-bold text-text">Life-Todo</h1>
                <p class="text-xs text-text-muted">Seguimiento Salud</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-lg mx-auto px-4 py-6">
        <router-outlet />
      </main>
      
      <nav class="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border/50 safe-area-bottom z-20">
        <div class="max-w-lg mx-auto flex">
          <a 
            routerLink="/today" 
            routerLinkActive="text-primary" 
            [routerLinkActiveOptions]="{exact: true}"
            class="flex-1 py-3 flex flex-col items-center gap-1 text-text-muted transition-colors relative"
          >
            <div class="absolute -top-3 w-12 h-1 rounded-full bg-primary opacity-0 transition-opacity" [class.opacity-100]="isActive('/today')"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-colors" [class.text-primary]="isActive('/today')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="text-xs font-medium">Hoy</span>
          </a>
          <a 
            routerLink="/weekly" 
            routerLinkActive="text-primary"
            class="flex-1 py-3 flex flex-col items-center gap-1 text-text-muted transition-colors relative"
          >
            <div class="absolute -top-3 w-12 h-1 rounded-full bg-primary opacity-0 transition-opacity" [class.opacity-100]="isActive('/weekly')"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-colors" [class.text-primary]="isActive('/weekly')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
            <span class="text-xs font-medium">Semanal</span>
          </a>
          <a 
            routerLink="/progress" 
            routerLinkActive="text-primary"
            class="flex-1 py-3 flex flex-col items-center gap-1 text-text-muted transition-colors relative"
          >
            <div class="absolute -top-3 w-12 h-1 rounded-full bg-primary opacity-0 transition-opacity" [class.opacity-100]="isActive('/progress')"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-colors" [class.text-primary]="isActive('/progress')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            <span class="text-xs font-medium">Progreso</span>
          </a>
        </div>
      </nav>
    </div>
  `
})
export class TabsComponent {
  isActive(path: string): boolean {
    return window.location.pathname === path;
  }
}
