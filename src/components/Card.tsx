import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  to: string;
  gradient?: boolean;
}

export const Card = ({ title, description, icon: Icon, to, gradient = false }: CardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.click();
    }
  };

  return (
    <Link
      to={to}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`
        block p-6 rounded-xl border transition-all duration-300
        hover:shadow-lg hover:-translate-y-[3px] focus:shadow-lg focus:-translate-y-[3px]
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        ${
          gradient
            ? 'gradient-primary text-primary-foreground border-transparent'
            : 'bg-card border-border hover:border-primary focus:border-primary'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`
          w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0
          ${gradient ? 'bg-white/20' : 'bg-primary text-primary-foreground'}
        `}
        >
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-1 ${gradient ? 'text-white' : 'text-foreground'}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-sm ${gradient ? 'text-white/80' : 'text-muted-foreground'}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
