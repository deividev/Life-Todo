import { cn } from '@/lib/cn';
import { Check, Loader2 } from 'lucide-react';

interface TagProps {
  variant?: 'success' | 'warn' | 'danger' | 'secondary';
  children: React.ReactNode;
  visible?: boolean;
}

export function Tag({ variant = 'success', children, visible = true }: TagProps) {
  if (!visible) return null;

  const variants = {
    success: 'bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] border border-[#6ee7b7] text-[#065f46]',
    warn: 'bg-gradient-to-br from-[#fef3c7] to-[#fde68a] border border-[#fcd34d] text-[#92400e]',
    danger: 'bg-gradient-to-br from-[#fee2e2] to-[#fecaca] border border-[#fca5a5] text-[#991b1b]',
    secondary: 'bg-slate-100 text-slate-600',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm',
      variants[variant]
    )}>
      {variant === 'warn' && <Loader2 className="w-3 h-3 animate-spin" />}
      {variant === 'success' && <Check className="w-3 h-3" />}
      {children}
    </span>
  );
}
