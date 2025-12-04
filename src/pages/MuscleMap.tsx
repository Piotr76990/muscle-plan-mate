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
      <Header title="Zbiór ćwiczeń" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
        <p className="text-muted-foreground text-center mt-4">
          Wybierz grupę mięśniową, aby zobaczyć dostępne ćwiczenia
        </p>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
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
