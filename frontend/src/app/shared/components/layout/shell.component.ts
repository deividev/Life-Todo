import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  color: string;
  active: boolean;
  gradient: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Toolbar],
  template: `
    <div class="app-shell">
      <p-toolbar class="app-header">
        <ng-template #start>
          <div class="header-container">
            <div class="header-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
              </svg>
            </div>
            <div class="header-titles">
              <h1 class="app-title">Life Tracker</h1>
              <p class="app-subtitle">Tu bienestar, día a día</p>
            </div>
          </div>
        </ng-template>
        <ng-template #end>
          <div class="header-date">
            <span class="date-day">{{ currentDay }}</span>
            <span class="date-month">{{ currentMonth }}</span>
          </div>
        </ng-template>
      </p-toolbar>

      <main class="app-content">
        <div class="app-content-inner">
          <router-outlet />
        </div>
      </main>

      <nav class="app-bottom-nav">
        <div class="bottom-nav-inner">
          @for (item of navItems; track item.route) {
            <a
              [routerLink]="item.route"
              routerLinkActive="nav-item-active"
              class="nav-item"
              [style.--nav-accent]="item.color"
            >
              <div class="nav-icon-wrapper" [style.background]="item.active ? 'white' : 'var(--color-bg-warm)'">
                <i [class]="'pi ' + item.icon"></i>
              </div>
              <span class="nav-item-label">{{ item.label }}</span>
            </a>
          }
        </div>
      </nav>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .header-container {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }

    @media (min-width: 640px) {
      .header-container {
        gap: 1rem;
      }
    }

    :host ::ng-deep .p-toolbar {
      @apply rounded-none border-0;
      background: linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%) !important;
      padding: 0.875rem 1rem !important;
      box-shadow: 0 4px 24px rgba(13, 148, 136, 0.4), inset 0 1px 0 rgba(255,255,255,0.15) !important;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .p-toolbar {
        padding: 1rem 1.5rem !important;
      }
    }

    .header-logo {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
    }

    @media (min-width: 640px) {
      .header-logo {
        width: 56px;
        height: 56px;
        border-radius: 16px;
      }
    }

    .header-logo i, .header-logo svg {
      font-size: 22px;
      color: white;
    }

    @media (min-width: 640px) {
      .header-logo i, .header-logo svg {
        font-size: 26px;
      }
    }

    .header-titles {
      display: flex;
      flex-direction: column;
    }

    .header-date {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 14px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    @media (min-width: 640px) {
      .header-date {
        padding: 12px 20px;
        border-radius: 16px;
      }
    }

    .date-day {
      font-size: 20px;
      font-weight: 700;
      color: white;
      line-height: 1;
      letter-spacing: -0.02em;
    }

    @media (min-width: 640px) {
      .date-day {
        font-size: 26px;
      }
    }

    .date-month {
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      text-transform: capitalize;
      margin-top: 3px;
    }

    @media (min-width: 640px) {
      .date-month {
        font-size: 13px;
        margin-top: 4px;
      }
    }

    .nav-icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    @media (min-width: 640px) {
      .nav-icon-wrapper {
        width: 44px;
        height: 44px;
        border-radius: 14px;
      }
    }

    @media (hover: hover) {
      .nav-item:hover .nav-icon-wrapper {
        transform: scale(1.05);
      }
    }

    .nav-item-active .nav-icon-wrapper {
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25) !important;
    }

    .nav-item-active .nav-icon-wrapper i {
      color: var(--color-primary) !important;
    }

    .nav-item i {
      color: var(--color-text-muted);
      font-size: 1.25rem;
    }

    @media (min-width: 640px) {
      .nav-item i {
        font-size: 1.375rem;
      }
    }
  `]
})
export class ShellComponent {
  navItems: NavItem[] = [
    { label: 'Hoy', icon: 'pi-sun', route: '/today', color: '#f59e0b', active: false, gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    { label: 'Semana', icon: 'pi-calendar', route: '/weekly', color: '#3b82f6', active: false, gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
    { label: 'Progreso', icon: 'pi-chart-line', route: '/progress', color: '#10b981', active: false, gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' }
  ];

  get currentDay(): string {
    return new Date().getDate().toString();
  }

  get currentMonth(): string {
    return new Date().toLocaleDateString('es-ES', { month: 'short' });
  }
}
