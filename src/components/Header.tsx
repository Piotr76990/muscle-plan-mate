import { Dumbbell } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40 shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">GymTracker</h1>
            {title && <p className="text-sm text-muted-foreground">{title}</p>}
          </div>
        </div>
      </div>
    </header>
  );
};
