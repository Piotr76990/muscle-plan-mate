import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Modal } from '@/components/Modal';
import { getExercisesByMuscle, getMuscleDisplayName, Exercise } from '@/data/exercises.sample';
import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const Exercises = () => {
  const [searchParams] = useSearchParams();
  const muscle = searchParams.get('muscle') || '';
  const exercises = getExercisesByMuscle(muscle);
  
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title={getMuscleDisplayName(muscle)} />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">

          {exercises.length === 0 ? (
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
                  onClick={() => setSelectedExercise(exercise)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
        title={selectedExercise?.name || ''}
      >
        {selectedExercise && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Opis</h4>
              <p className="text-foreground">{selectedExercise.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">Sprzęt</h4>
              <p className="text-foreground">{selectedExercise.equipment}</p>
            </div>
            <button className="w-full py-3 px-4 gradient-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth">
              Dodaj do treningu
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Exercises;
