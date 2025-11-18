import { NavLink } from 'react-router-dom';
import { Flame, Calendar, TrendingUp } from 'lucide-react';

export const BottomNav = () => {
  const navItems = [
    { to: '/muscle-map', icon: Flame, label: 'Mapa' },
    { to: '/plan', icon: Calendar, label: 'Plan' },
    { to: '/history', icon: TrendingUp, label: 'Historia' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 shadow-medium md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-smooth ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
