import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-bg pb-20 safe-area-bottom">
      <header class="bg-surface/80 backdrop-blur-xl border-b border-border-light sticky top-0 z-10 safe-area-top">
        <div class="max-w-md mx-auto px-5 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div>
                <h1 class="text-lg font-bold text-text tracking-tight">Life-Todo</h1>
                <p class="text-xs text-text-muted font-medium">Seguimiento de Salud</p>
              </div>
            </div>
            <div class="w-2 h-2 rounded-full bg-primary animate-pulse-subtle"></div>
          </div>
        </div>
      </header>

      <main class="max-w-md mx-auto px-5 py-6">
        <router-outlet />
      </main>
      
      <nav class="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-border-light safe-area-bottom z-20">
        <div class="max-w-md mx-auto flex items-stretch">
          <a 
            routerLink="/today" 
            routerLinkActive="nav-tab-active" 
            [routerLinkActiveOptions]="{exact: true}"
            class="nav-tab flex-1"
          >
            @if (isActive('/today')) {
              <div class="nav-indicator"></div>
            }
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="text-[11px] font-semibold">Hoy</span>
          </a>
          <a 
            routerLink="/weekly" 
            routerLinkActive="nav-tab-active"
            class="nav-tab flex-1"
          >
            @if (isActive('/weekly')) {
              <div class="nav-indicator"></div>
            }
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <path d="M8 14h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M8 18h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M16 18h.01"></path>
            </svg>
            <span class="text-[11px] font-semibold">Semanal</span>
          </a>
          <a 
            routerLink="/progress" 
            routerLinkActive="nav-tab-active"
            class="nav-tab flex-1"
          >
            @if (isActive('/progress')) {
              <div class="nav-indicator"></div>
            }
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            <span class="text-[11px] font-semibold">Progreso</span>
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
