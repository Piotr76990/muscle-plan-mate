import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { ExerciseCard } from '@/components/ExerciseCard';
import { fetchExercisesByMuscle } from '@/utils/api';
import { getMuscleDisplayName, Exercise } from '@/data/exercises.sample';
import { Loader2 } from 'lucide-react';

const Exercises = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const muscle = searchParams.get('muscle') || '';
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExercises = async () => {
      if (!muscle) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = await fetchExercisesByMuscle(muscle);
      setExercises(data);
      setLoading(false);
    };

    loadExercises();
  }, [muscle]);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title={getMuscleDisplayName(muscle)} />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Brak ćwiczeń dla wybranej grupy mięśniowej
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onClick={() => navigate(`/exercise/${exercise.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Exercises;
