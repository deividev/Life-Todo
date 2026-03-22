import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-background px-4">
      <div class="w-full max-w-sm">
        <div class="bg-surface rounded-2xl shadow-lg p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-text mb-2">Life-Todo</h1>
            <p class="text-text-muted">Tu diario de salud personal</p>
          </div>

          @if (magicLinkSent()) {
            <div class="text-center">
              <div class="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold mb-2">Revisa tu email</h2>
              <p class="text-text-muted mb-6">
                Hemos enviado un enlace mágico a <strong>{{ email() }}</strong>
              </p>
              <button 
                (click)="reset()"
                class="text-primary hover:text-primary-dark font-medium"
              >
                Usar otro email
              </button>
            </div>
          } @else {
            <form (ngSubmit)="onSubmit()" class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-text mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="emailInput"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  class="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              @if (error()) {
                <div class="p-3 bg-danger/10 text-danger text-sm rounded-xl">
                  {{ error() }}
                </div>
              }

              <button
                type="submit"
                [disabled]="loading()"
                class="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                @if (loading()) {
                  Enviando...
                } @else {
                  Enviar enlace mágico
                }
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  emailInput = '';
  email = signal('');
  loading = signal(false);
  error = signal<string | null>(null);
  magicLinkSent = signal(false);

  async onSubmit() {
    if (!this.emailInput.trim()) return;
    
    this.loading.set(true);
    this.error.set(null);
    this.email.set(this.emailInput.trim());

    const { error } = await this.authService.signInWithMagicLink(this.emailInput.trim());
    
    this.loading.set(false);
    
    if (error) {
      this.error.set('Error al enviar el enlace. Inténtalo de nuevo.');
    } else {
      this.magicLinkSent.set(true);
    }
  }

  reset() {
    this.magicLinkSent.set(false);
    this.emailInput = '';
    this.email.set('');
    this.error.set(null);
  }
}
