import { NavLink, useLocation } from 'react-router-dom';
import { Flame, Calendar, TrendingUp, Scale } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { to: '/muscle-map', icon: Flame, label: 'Zbiór', ariaLabel: 'Zbiór ćwiczeń' },
    { to: '/plan', icon: Calendar, label: 'Plan', ariaLabel: 'Plan treningowy' },
    { to: '/history', icon: TrendingUp, label: 'Historia', ariaLabel: 'Treningi historyczne' },
    { to: '/weight', icon: Scale, label: 'Waga', ariaLabel: 'Tracker wagi' },
  ];

  const handleClick = (e: React.MouseEvent, to: string) => {
    if (location.pathname === to) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      role="tablist"
      aria-label="Główna nawigacja"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Background with blur and shadow */}
      <div 
        className="absolute inset-0 bg-card/95 backdrop-blur-md border-t border-border"
        style={{ boxShadow: '0 -4px 16px rgba(2, 6, 23, 0.6)' }}
      />
      
      <div className="relative flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              role="tab"
              aria-selected={isActive}
              aria-label={item.ariaLabel}
              tabIndex={0}
              onClick={(e) => handleClick(e, item.to)}
              className={`
                flex flex-col items-center justify-center flex-1 h-full
                min-w-[56px] min-h-[56px]
                transition-all duration-150 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card
                ${isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground active:scale-95'
                }
              `}
            >
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-full
                transition-all duration-150 ease-out
                ${isActive 
                  ? 'bg-primary/15 scale-105' 
                  : 'bg-transparent'
                }
              `}>
                <item.icon 
                  className={`w-6 h-6 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} 
                />
              </div>
              <span className={`
                text-[11px] mt-0.5 font-medium
                transition-all duration-150
                ${isActive ? 'opacity-100' : 'opacity-70'}
              `}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};