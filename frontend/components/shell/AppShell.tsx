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
      <main className="flex-1 lg:ml-[300px] min-h-screen pb-24 lg:pb-10">
        <div className="px-4 pt-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
