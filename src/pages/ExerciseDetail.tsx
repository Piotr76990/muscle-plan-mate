import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { ExerciseInfoIcons } from '@/components/ExerciseInfoIcons';
import { fetchExerciseById } from '@/utils/api';
import { Exercise } from '@/data/exercises.sample';
import { Loader2 } from 'lucide-react';

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercise = async () => {
      if (!id) return;
      
      setLoading(true);
      const data = await fetchExerciseById(id);
      setExercise(data);
      setLoading(false);
    };

    loadExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header title="Szczegóły ćwiczenia" />
        <div className="container mx-auto px-4 pt-4">
          <BackButton />
        </div>
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </main>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen pb-20 md:pb-0">
        <Header title="Szczegóły ćwiczenia" />
        <div className="container mx-auto px-4 pt-4">
          <BackButton />
        </div>
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto text-center py-12">
            <p className="text-muted-foreground">Nie znaleziono ćwiczenia</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title={exercise.name} />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Exercise info icons panel */}
          <ExerciseInfoIcons exercise={exercise} />

          {/* Exercise details */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Opis</h3>
              <p className="text-foreground">{exercise.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Sprzęt</h3>
              <p className="text-foreground">{exercise.equipment}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">Grupa mięśniowa</h3>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {exercise.muscle}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExerciseDetail;
