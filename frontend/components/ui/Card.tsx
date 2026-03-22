import { cn } from '@/lib/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
      'transition-all duration-200 hover:border-teal-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-px',
      'sm:p-6 sm:rounded-2xl',
      'lg:p-7',
      className
    )}>
      {children}
    </div>
  );
}
