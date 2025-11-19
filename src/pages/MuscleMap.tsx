import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { getMuscleGroups, getMuscleDisplayName } from '@/data/exercises.sample';
import { useNavigate } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const MuscleMap = () => {
  const navigate = useNavigate();
  const muscleGroups = getMuscleGroups();

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Mapa mięśni" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              Wybierz grupę mięśniową, aby zobaczyć dostępne ćwiczenia
            </p>
          </div>

          {/* Placeholder for body SVG */}
          <div className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl border border-border p-12 flex items-center justify-center">
            <div className="text-center">
              <Dumbbell className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Sylwetka ciała - miejsce na przyszłą interaktywną mapę
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => navigate(`/exercises?muscle=${muscle}`)}
                className="p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-soft transition-smooth text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {getMuscleDisplayName(muscle)}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MuscleMap;
