import { Injectable, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  readonly user = this.supabaseService.user;
  readonly isAuthenticated = computed(() => !!this.user());

  async signInWithMagicLink(email: string): Promise<{ error: Error | null }> {
    return this.supabaseService.signInWithMagicLink(email);
  }

  async signOut(): Promise<void> {
    await this.supabaseService.signOut();
    this.router.navigate(['/login']);
  }
}
