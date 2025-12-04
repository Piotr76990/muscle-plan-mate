import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Powrót"
      className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <ArrowLeft className="w-4 h-4" />
      Powrót
    </button>
  );
};
