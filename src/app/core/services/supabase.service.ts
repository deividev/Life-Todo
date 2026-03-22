import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private client: SupabaseClient;
  private _user = signal<User | null>(null);
  
  readonly user = this._user.asReadonly();

  constructor() {
    this.client = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
    
    this.client.auth.onAuthStateChange((event, session) => {
      this._user.set(session?.user ?? null);
    });
    
    this.getInitialSession();
  }

  private async getInitialSession() {
    const { data: { session } } = await this.client.auth.getSession();
    this._user.set(session?.user ?? null);
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  async signInWithMagicLink(email: string): Promise<{ error: Error | null }> {
    const { error } = await this.client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    });
    return { error };
  }

  async signOut(): Promise<void> {
    await this.client.auth.signOut();
  }
}
