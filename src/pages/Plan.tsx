import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { Modal } from '@/components/Modal';
import { Calendar, Plus, Trash2, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { sampleExercises } from '@/data/exercises.sample';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Exercise {
  id: string;
  name: string;
  setsText?: string;
}

interface Training {
  id: string;
  day: string;
  name: string;
  exercises: Exercise[];
  createdAt: string;
}

const STORAGE_KEY = 'plan_v1';

const Plan = () => {
  const daysOfWeek = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Poniedziałek');
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  
  // Form state
  const [trainingName, setTrainingName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());
  const [exerciseSets, setExerciseSets] = useState<Record<string, string>>({});

  // Load trainings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTrainings(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load trainings', e);
      }
    }
  }, []);

  // Save trainings to localStorage
  const saveTrainings = (newTrainings: Training[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrainings));
    setTrainings(newTrainings);
  };

  const openNewTrainingModal = (day?: string) => {
    setSelectedDay(day || 'Poniedziałek');
    setTrainingName('');
    setSelectedExercises(new Set());
    setExerciseSets({});
    setEditingTraining(null);
    setIsModalOpen(true);
  };

  const openEditTrainingModal = (training: Training) => {
    setSelectedDay(training.day);
    setTrainingName(training.name);
    const exerciseIds = new Set(training.exercises.map(e => e.id));
    setSelectedExercises(exerciseIds);
    const sets: Record<string, string> = {};
    training.exercises.forEach(e => {
      if (e.setsText) sets[e.id] = e.setsText;
    });
    setExerciseSets(sets);
    setEditingTraining(training);
    setIsModalOpen(true);
  };

  const handleSaveTraining = () => {
    if (!trainingName.trim()) {
      toast.error('Nazwa treningu nie może być pusta');
      return;
    }

    if (selectedExercises.size === 0) {
      toast.error('Wybierz co najmniej jedno ćwiczenie');
      return;
    }

    const exercises: Exercise[] = Array.from(selectedExercises).map(id => {
      const exercise = sampleExercises.find(e => e.id === id);
      return {
        id,
        name: exercise?.name || '',
        setsText: exerciseSets[id] || ''
      };
    });

    if (editingTraining) {
      // Update existing training
      const updated = trainings.map(t => 
        t.id === editingTraining.id 
          ? { ...editingTraining, day: selectedDay, name: trainingName, exercises }
          : t
      );
      saveTrainings(updated);
      toast.success('Trening zaktualizowany');
    } else {
      // Create new training
      const newTraining: Training = {
        id: Date.now().toString(),
        day: selectedDay,
        name: trainingName,
        exercises,
        createdAt: new Date().toISOString()
      };
      saveTrainings([...trainings, newTraining]);
      toast.success('Trening dodany');
    }

    setIsModalOpen(false);
  };

  const handleDeleteTraining = (trainingId: string) => {
    const updated = trainings.filter(t => t.id !== trainingId);
    saveTrainings(updated);
    toast.success('Trening usunięty');
    setIsModalOpen(false);
  };

  const toggleExercise = (exerciseId: string) => {
    const newSelected = new Set(selectedExercises);
    if (newSelected.has(exerciseId)) {
      newSelected.delete(exerciseId);
      const newSets = { ...exerciseSets };
      delete newSets[exerciseId];
      setExerciseSets(newSets);
    } else {
      newSelected.add(exerciseId);
    }
    setSelectedExercises(newSelected);
  };

  const getDayTrainings = (day: string) => {
    return trainings.filter(t => t.day === day);
  };

  // Get top 12 most common exercises for quick selection
  const popularExercises = sampleExercises.slice(0, 12);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Plan treningowy" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Twój plan tygodniowy</h2>
            <button 
              onClick={() => openNewTrainingModal()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Nowy trening</span>
            </button>
          </div>

          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const dayTrainings = getDayTrainings(day);
              const hasTraining = dayTrainings.length > 0;

              return (
                <div
                  key={day}
                  onClick={() => hasTraining ? openEditTrainingModal(dayTrainings[0]) : openNewTrainingModal(day)}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{day}</h3>
                      {hasTraining ? (
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">{dayTrainings[0].name}</p>
                          <p>{dayTrainings[0].exercises.length} ćwiczeń</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Dzień odpoczynku</p>
                      )}
                    </div>
                    {hasTraining && (
                      <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
                        Zaplanowany
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              💡 Kliknij dzień, aby dodać lub edytować trening
            </p>
          </div>
        </div>
      </main>

      {/* Training Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTraining ? 'Edytuj trening' : 'Nowy trening'}
      >
        <div className="space-y-4">
          {/* Day Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dzień tygodnia
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          {/* Training Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nazwa treningu
            </label>
            <Input
              type="text"
              value={trainingName}
              onChange={(e) => setTrainingName(e.target.value)}
              placeholder="np. Trening klatki i tricepsów"
              className="w-full"
            />
          </div>

          {/* Exercise Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Wybierz ćwiczenia
            </label>
            <div className="max-h-64 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
              {popularExercises.map(exercise => (
                <div key={exercise.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedExercises.has(exercise.id)}
                      onCheckedChange={() => toggleExercise(exercise.id)}
                    />
                    <label className="text-sm text-foreground flex-1 cursor-pointer">
                      {exercise.name}
                    </label>
                  </div>
                  {selectedExercises.has(exercise.id) && (
                    <Input
                      type="text"
                      value={exerciseSets[exercise.id] || ''}
                      onChange={(e) => setExerciseSets({ ...exerciseSets, [exercise.id]: e.target.value })}
                      placeholder="np. 3x10"
                      className="ml-6 text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSaveTraining}
              className="flex-1"
            >
              Zapisz
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Anuluj
            </Button>
            {editingTraining && (
              <Button
                onClick={() => handleDeleteTraining(editingTraining.id)}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Plan;
