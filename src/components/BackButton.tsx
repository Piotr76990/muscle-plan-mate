import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // If no history, go home immediately
    if (window.history.length <= 1) {
      navigate('/');
      return;
    }

    // Try to go back, but verify it worked
    const currentPath = window.location.pathname;
    navigate(-1);

    // Check after 120ms if URL actually changed
    setTimeout(() => {
      if (window.location.pathname === currentPath) {
        // Navigate didn't work, go home
        navigate('/');
      }
    }, 120);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBack();
    }
  };

  return (
    <button
      onClick={handleBack}
      onKeyDown={handleKeyDown}
      aria-label="Powrót"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <ArrowLeft className="w-4 h-4" />
      Powrót
    </button>
  );
};
