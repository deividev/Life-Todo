import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <div class="app-header-content">
          <div class="flex items-center gap-3">
            <div class="header-logo">
              <i class="pi pi-heart-fill"></i>
            </div>
            <div>
              <h1 class="app-title">Life Tracker</h1>
              <p class="app-subtitle">Tu registro de bienestar</p>
            </div>
          </div>
          <div class="header-date">
            <span class="date-day">{{ currentDay }}</span>
            <span class="date-month">{{ currentMonth }}</span>
          </div>
        </div>
      </header>

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
            >
              <i [class]="'pi ' + item.icon + ' nav-item-icon'"></i>
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

    .header-logo {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .header-logo i {
      font-size: 20px;
      color: white;
    }

    .header-date {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 8px 14px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }

    .date-day {
      font-size: 18px;
      font-weight: 700;
      color: white;
      line-height: 1;
    }

    .date-month {
      font-size: 11px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.85);
      text-transform: capitalize;
    }
  `]
})
export class ShellComponent {
  navItems: NavItem[] = [
    { label: 'Hoy', icon: 'pi-sun', route: '/today' },
    { label: 'Semana', icon: 'pi-calendar', route: '/weekly' },
    { label: 'Progreso', icon: 'pi-chart-line', route: '/progress' }
  ];

  get currentDay(): string {
    return new Date().getDate().toString();
  }

  get currentMonth(): string {
    return new Date().toLocaleDateString('es-ES', { month: 'short' });
  }
}
