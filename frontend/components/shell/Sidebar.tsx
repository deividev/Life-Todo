'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Calendar, TrendingUp, Apple } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Hoy', icon: Sun },
  { href: '/weekly', label: 'Semanal', icon: Calendar },
  { href: '/progress', label: 'Progreso', icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[300px] min-h-screen bg-gradient-to-b from-[#0d9488] from-0% via-[#0f766e] via-40% to-[#115e59] to-100% shadow-2xl fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <div className="text-white">
            <div className="text-xl font-bold">Life Todo</div>
            <div className="text-sm text-white/70">Track your wellness</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-4 px-6 py-4 mx-3 rounded-xl transition-all duration-200',
                isActive 
                  ? 'text-white bg-white/15 shadow-[inset_3px_0_0_white]' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-semibold text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
