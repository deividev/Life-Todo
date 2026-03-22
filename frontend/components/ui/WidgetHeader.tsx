import { cn } from '@/lib/cn';

interface WidgetHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  gradient?: string;
  iconColor?: string;
}

export function WidgetHeader({ icon, title, subtitle, className, gradient, iconColor }: WidgetHeaderProps) {
  return (
    <div className={cn('flex items-center gap-3 mb-4 sm:mb-6', className)}>
      <div 
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
        style={gradient ? { background: gradient } : { background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)' }}
      >
        <div style={iconColor ? { color: iconColor } : { color: '#0d9488' }}>
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-base sm:text-lg font-bold text-slate-900">{title}</h4>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
