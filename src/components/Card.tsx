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
  return (
    <Link
      to={to}
      className={`
        block p-6 rounded-xl border transition-smooth
        hover:shadow-medium hover:-translate-y-1
        ${
          gradient
            ? 'gradient-primary text-primary-foreground border-transparent'
            : 'bg-card border-border hover:border-primary'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div
          className={`
          w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
          ${gradient ? 'bg-white/20' : 'bg-primary text-primary-foreground'}
        `}
        >
          <Icon className="w-6 h-6" />
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
