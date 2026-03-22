'use client';

import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen pb-24 lg:pb-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1400px]">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
