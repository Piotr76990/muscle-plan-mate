import { Dumbbell } from 'lucide-react';
import { Exercise } from '@/data/exercises.sample';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

export const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer shadow-soft"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Dumbbell className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{exercise.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
              {exercise.equipment}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
