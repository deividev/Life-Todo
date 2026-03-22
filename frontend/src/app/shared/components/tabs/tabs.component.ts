import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <!-- Desktop Sidebar -->
      <aside class="app-sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <div class="sidebar-logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div class="sidebar-logo-text">
              <div class="sidebar-logo-title">Life-Todo</div>
              <div class="sidebar-logo-subtitle">Seguimiento de Salud</div>
            </div>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <a 
            routerLink="/today" 
            routerLinkActive="active" 
            [routerLinkActiveOptions]="{exact: true}"
            class="sidebar-nav-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Hoy</span>
          </a>
          <a 
            routerLink="/weekly" 
            routerLinkActive="active"
            class="sidebar-nav-item"
          >
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
            <span>Semanal</span>
          </a>
          <a 
            routerLink="/progress" 
            routerLinkActive="active"
            class="sidebar-nav-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
            <span>Progreso</span>
          </a>
        </nav>
        
        <div class="mt-auto p-6 border-t border-white/10">
          <div class="flex items-center gap-2 text-white/50 text-sm">
            <div class="w-2 h-2 rounded-full bg-white/50"></div>
            <span>Sistema activo</span>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="app-main">
        <!-- Mobile Header -->
        <header class="app-header">
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
              <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
        </header>

        <!-- Mobile Content -->
        <div class="app-content lg:px-8 xl:px-12 2xl:px-16">
          <div class="lg:app-content-inner">
            <router-outlet />
          </div>
        </div>
        
        <!-- Mobile Bottom Nav -->
        <nav class="app-bottom-nav">
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
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .nav-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 12px 8px;
      flex: 1;
      color: var(--color-text-muted);
      transition: all 0.2s ease;
      position: relative;
    }

    @media (hover: hover) {
      .nav-tab:hover {
        color: var(--color-text-secondary);
        background: var(--color-surface-hover);
      }
    }

    .nav-tab.nav-tab-active {
      color: var(--color-primary);
    }

    .nav-indicator {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 3px;
      background: var(--color-primary);
      border-radius: 0 0 3px 3px;
    }

    @media (min-width: 1024px) {
      .nav-tab {
        display: none;
      }
    }
  `]
})
export class TabsComponent {
  isActive(path: string): boolean {
    return window.location.pathname === path;
  }
}
