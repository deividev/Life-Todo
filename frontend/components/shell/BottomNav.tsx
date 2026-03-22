'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Calendar, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { href: '/', label: 'Hoy', icon: Sun },
  { href: '/weekly', label: 'Semanal', icon: Calendar },
  { href: '/progress', label: 'Progreso', icon: TrendingUp },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 pb-safe bg-white/98 backdrop-blur-xl border-t border-slate-200/80 shadow-[-4px_0_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all duration-200 min-w-[72px]',
                isActive 
                  ? 'text-[#0d9488] bg-gradient-to-br from-[#ccfbf1]/50 to-[#ccfbf1]/30' 
                  : 'text-[#94a3b8] hover:bg-[#f8fafc] hover:text-[#475569]'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
