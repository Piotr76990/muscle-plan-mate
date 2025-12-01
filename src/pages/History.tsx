import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { Modal } from '@/components/Modal';
import { TrendingUp, CheckCircle2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllWorkouts, deleteWorkoutById, type Workout } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const History = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = () => {
    const data = getAllWorkouts();
    // Sort by date descending
    const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setWorkouts(sorted);
  };

  const handleDeleteWorkout = () => {
    if (!workoutToDelete) return;
    
    deleteWorkoutById(workoutToDelete);
    loadWorkouts();
    setWorkoutToDelete(null);
    
    toast({
      title: 'Usunięto trening',
      description: 'Trening został pomyślnie usunięty z historii.',
    });
  };

  const handleOpenDetails = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseDetails = () => {
    setSelectedWorkout(null);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Historia i progres" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Ten tydzień</span>
              </div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">treningi</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Seria</span>
              </div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">dni z rzędu</p>
            </div>
          </div>

          {/* Recent workouts */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Ostatnie treningi</h2>
            
            {workouts.length === 0 ? (
              <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
                <p className="text-muted-foreground">
                  Brak zapisanych treningów. Rozpocznij swój pierwszy trening!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {workouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth flex items-start justify-between gap-3"
                  >
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => handleOpenDetails(workout)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleOpenDetails(workout)}
                      aria-label={`Otwórz szczegóły treningu ${workout.title}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{workout.title}</h3>
                        <span className="text-xs text-muted-foreground">{workout.date}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{workout.exercises.length} ćwiczeń</span>
                        {workout.duration && (
                          <>
                            <span>•</span>
                            <span>{workout.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setWorkoutToDelete(workout.id);
                      }}
                      aria-label="Usuń trening"
                      className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">🎯 Twoje cele</h3>
            <p className="text-sm text-muted-foreground">
              Funkcja wykresów i szczegółowej analizy progresu będzie dostępna wkrótce!
            </p>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {selectedWorkout && (
        <Modal
          isOpen={!!selectedWorkout}
          onClose={handleCloseDetails}
          title="Szczegóły treningu"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">{selectedWorkout.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedWorkout.date}</p>
              {selectedWorkout.duration && (
                <p className="text-sm text-muted-foreground">Czas trwania: {selectedWorkout.duration}</p>
              )}
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Ćwiczenia:</h4>
              <div className="space-y-3">
                {selectedWorkout.exercises.map((exercise, idx) => (
                  <div key={idx} className="bg-muted/30 rounded-lg p-3 border border-border">
                    <p className="font-medium text-foreground mb-1">{exercise.name}</p>
                    {exercise.setsText && (
                      <p className="text-sm text-muted-foreground">{exercise.setsText}</p>
                    )}
                    {exercise.sets && exercise.sets.length > 0 && (
                      <div className="text-sm text-muted-foreground space-y-1 mt-2">
                        {exercise.sets.map((set, setIdx) => (
                          <div key={setIdx}>
                            Seria {setIdx + 1}: {set.reps} powtórzeń × {set.weight} kg
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleCloseDetails} 
              className="w-full"
            >
              Zamknij
            </Button>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!workoutToDelete} onOpenChange={(open) => !open && setWorkoutToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usunąć trening?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta operacja jest nieodwracalna. Trening zostanie trwale usunięty z historii.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteWorkout}>
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default History;
