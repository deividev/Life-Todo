import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  color: string;
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
              <i class="pi pi-heart-fill"></i>
            </div>
            <div class="header-titles">
              <h1 class="app-title">Life Tracker</h1>
              <p class="app-subtitle">Tu registro de bienestar</p>
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
        <router-outlet />
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
              <div class="nav-icon-wrapper">
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
      gap: 0.75rem;
    }

    @media (min-width: 640px) {
      .header-container {
        gap: 1rem;
      }
    }

    :host ::ng-deep .p-toolbar {
      @apply rounded-none border-0;
      background: linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%) !important;
      padding: 0.75rem 1rem !important;
      box-shadow: 0 4px 20px rgba(13, 148, 136, 0.4), inset 0 1px 0 rgba(255,255,255,0.1) !important;
    }

    @media (min-width: 640px) {
      :host ::ng-deep .p-toolbar {
        padding: 1rem 1.25rem !important;
      }
    }

    .header-logo {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.1);
      flex-shrink: 0;
    }

    @media (min-width: 640px) {
      .header-logo {
        width: 48px;
        height: 48px;
        border-radius: 14px;
      }
    }

    .header-logo i {
      font-size: 18px;
      color: white;
    }

    @media (min-width: 640px) {
      .header-logo i {
        font-size: 22px;
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
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    @media (min-width: 640px) {
      .header-date {
        padding: 8px 16px;
        border-radius: 12px;
      }
    }

    .date-day {
      font-size: 16px;
      font-weight: 700;
      color: white;
      line-height: 1;
    }

    @media (min-width: 640px) {
      .date-day {
        font-size: 20px;
      }
    }

    .date-month {
      font-size: 10px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      text-transform: capitalize;
      margin-top: 2px;
    }

    @media (min-width: 640px) {
      .date-month {
        font-size: 11px;
      }
    }

    .nav-icon-wrapper {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--nav-accent, #f1f5f9);
      transition: all 0.2s ease;
    }

    @media (min-width: 640px) {
      .nav-icon-wrapper {
        width: 40px;
        height: 40px;
        border-radius: 12px;
      }
    }

    .nav-item:hover .nav-icon-wrapper {
      transform: scale(1.05);
    }

    .nav-item-active .nav-icon-wrapper {
      background: white !important;
      box-shadow: 0 2px 8px rgba(13, 148, 136, 0.25);
    }

    .nav-item-active .nav-icon-wrapper i {
      color: var(--color-primary) !important;
    }

    .nav-item-icon {
      color: var(--color-text-muted);
      font-size: 1rem;
    }

    @media (min-width: 640px) {
      .nav-item-icon {
        font-size: 1.25rem;
      }
    }

    .nav-item i {
      color: var(--color-text-muted);
      font-size: 1rem;
    }

    @media (min-width: 640px) {
      .nav-item i {
        font-size: 1.25rem;
      }
    }
  `]
})
export class ShellComponent {
  navItems: NavItem[] = [
    { label: 'Hoy', icon: 'pi-sun', route: '/today', color: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
    { label: 'Semana', icon: 'pi-calendar', route: '/weekly', color: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
    { label: 'Progreso', icon: 'pi-chart-line', route: '/progress', color: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' }
  ];

  get currentDay(): string {
    return new Date().getDate().toString();
  }

  get currentMonth(): string {
    return new Date().toLocaleDateString('es-ES', { month: 'short' });
  }
}
