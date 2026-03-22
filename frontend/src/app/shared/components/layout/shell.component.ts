import { Component, signal } from '@angular/core';
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
          <div>
            <h1 class="app-title">Life Tracker</h1>
            <p class="app-subtitle">Tu registro de bienestar</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
            <i class="pi pi-heart text-primary"></i>
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
  `]
})
export class ShellComponent {
  navItems: NavItem[] = [
    { label: 'Hoy', icon: 'pi-sun', route: '/today' },
    { label: 'Semana', icon: 'pi-calendar', route: '/weekly' },
    { label: 'Progreso', icon: 'pi-chart-line', route: '/progress' }
  ];
}
