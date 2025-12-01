import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { Modal } from '@/components/Modal';
import { Calendar, Plus, Trash2, X, ArrowUp, ArrowDown, Eye, Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleExercises, getExercisesByMuscle } from '@/data/exercises.sample';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  updatedAt: string;
}

const STORAGE_KEY = 'plan_v1';

const Plan = () => {
  const navigate = useNavigate();
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Poniedziałek');
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [previewTraining, setPreviewTraining] = useState<Training | null>(null);
  
  // Form state
  const [trainingName, setTrainingName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [exerciseSets, setExerciseSets] = useState<Record<string, string>>({});
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('klatka');
  
  // Muscle groups in desired order
  const muscleGroups = [
    { id: 'klatka', name: 'Klatka' },
    { id: 'plecy', name: 'Plecy' },
    { id: 'barki', name: 'Barki' },
    { id: 'biceps', name: 'Biceps' },
    { id: 'przedramie', name: 'Przedramię' },
    { id: 'uda', name: 'Uda', subGroups: ['czworoglowy', 'dwuglowy'] },
    { id: 'lydki', name: 'Łydki' },
    { id: 'brzuch', name: 'Brzuch' },
  ];

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
    setSelectedExercises([]);
    setExerciseSets({});
    setSelectedMuscleGroup('klatka');
    setEditingTraining(null);
    setIsModalOpen(true);
  };

  const openPreviewModal = (training: Training) => {
    setPreviewTraining(training);
    setIsPreviewOpen(true);
  };

  const openEditFromPreview = () => {
    if (!previewTraining) return;
    setIsPreviewOpen(false);
    setSelectedDay(previewTraining.day);
    setTrainingName(previewTraining.name);
    const exerciseIds = previewTraining.exercises.map(e => e.id);
    setSelectedExercises(exerciseIds);
    const sets: Record<string, string> = {};
    previewTraining.exercises.forEach(e => {
      if (e.setsText) sets[e.id] = e.setsText;
    });
    setExerciseSets(sets);
    setEditingTraining(previewTraining);
    setIsModalOpen(true);
  };

  const handleSaveTraining = () => {
    if (!trainingName.trim()) {
      toast.error('Nazwa treningu nie może być pusta');
      return;
    }

    if (selectedExercises.length === 0) {
      toast.error('Wybierz co najmniej jedno ćwiczenie');
      return;
    }

    const exercises: Exercise[] = selectedExercises.map(id => {
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
          ? { ...editingTraining, day: selectedDay, name: trainingName, exercises, updatedAt: new Date().toISOString() }
          : t
      );
      saveTrainings(updated);
      toast.success('Trening zaktualizowany');
    } else {
      // Create new training - replace existing for the day if any
      const existingIndex = trainings.findIndex(t => t.day === selectedDay);
      const newTraining: Training = {
        id: Date.now().toString(),
        day: selectedDay,
        name: trainingName,
        exercises,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      if (existingIndex >= 0) {
        // Replace existing training for this day
        const updated = [...trainings];
        updated[existingIndex] = newTraining;
        saveTrainings(updated);
      } else {
        // Add new training
        saveTrainings([...trainings, newTraining]);
      }
      toast.success('Trening dodany');
    }

    setIsModalOpen(false);
    navigate('/plan', { replace: true });
  };

  const confirmDeleteTraining = () => {
    if (!previewTraining) return;
    const updated = trainings.filter(t => t.id !== previewTraining.id);
    saveTrainings(updated);
    toast.success('Trening usunięty');
    setIsDeleteDialogOpen(false);
    setIsPreviewOpen(false);
    setPreviewTraining(null);
  };

  // CRUD helpers
  const getPlanForDay = (day: string): Training | null => {
    return trainings.find(t => t.day === day) || null;
  };

  const toggleExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      // Remove from selected
      setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
      const newSets = { ...exerciseSets };
      delete newSets[exerciseId];
      setExerciseSets(newSets);
    } else {
      // Add to selected (at the end)
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const moveExerciseUp = (index: number) => {
    if (index === 0) return;
    const newSelected = [...selectedExercises];
    [newSelected[index - 1], newSelected[index]] = [newSelected[index], newSelected[index - 1]];
    setSelectedExercises(newSelected);
  };

  const moveExerciseDown = (index: number) => {
    if (index === selectedExercises.length - 1) return;
    const newSelected = [...selectedExercises];
    [newSelected[index], newSelected[index + 1]] = [newSelected[index + 1], newSelected[index]];
    setSelectedExercises(newSelected);
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(id => id !== exerciseId));
    const newSets = { ...exerciseSets };
    delete newSets[exerciseId];
    setExerciseSets(newSets);
  };

  const getExercisesForGroup = (groupId: string, subGroups?: string[]) => {
    if (subGroups) {
      return sampleExercises.filter(ex => subGroups.includes(ex.muscle));
    }
    return getExercisesByMuscle(groupId);
  };

  const getDayTrainings = (day: string) => {
    return trainings.filter(t => t.day === day);
  };

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
                  onClick={() => hasTraining ? openPreviewModal(dayTrainings[0]) : openNewTrainingModal(day)}
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

          {/* Exercise Selection with Dropdown and Selected Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Exercise Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Wybierz ćwiczenia:
              </label>
              
              {/* Muscle Group Dropdown */}
              <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                <SelectTrigger className="w-full mb-3">
                  <SelectValue placeholder="Wybierz kategorię" />
                </SelectTrigger>
                <SelectContent>
                  {muscleGroups.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Exercise List */}
              <div className="max-h-64 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
                {getExercisesForGroup(
                  selectedMuscleGroup,
                  muscleGroups.find(g => g.id === selectedMuscleGroup)?.subGroups
                ).map(exercise => (
                  <div key={exercise.id} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={selectedExercises.includes(exercise.id)}
                        onCheckedChange={() => toggleExercise(exercise.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <label className="text-sm text-foreground cursor-pointer block">
                          {exercise.name}
                        </label>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {exercise.equipment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {selectedExercises.includes(exercise.id) && (
                      <Input
                        type="text"
                        value={exerciseSets[exercise.id] || ''}
                        onChange={(e) => setExerciseSets({ ...exerciseSets, [exercise.id]: e.target.value })}
                        placeholder="np. 3x10 80kg"
                        className="ml-6 text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Selected Exercises Panel */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Wybrane ćwiczenia
                </label>
                <span className="text-xs text-muted-foreground">
                  Wybrano {selectedExercises.length}
                </span>
              </div>
              <div className="border border-border rounded-lg p-3 min-h-[200px] max-h-64 overflow-y-auto">
                {selectedExercises.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Brak wybranych ćwiczeń
                  </p>
                ) : (
                  <div className="space-y-2">
                    {selectedExercises.map((exerciseId, index) => {
                      const exercise = sampleExercises.find(e => e.id === exerciseId);
                      return (
                        <div key={exerciseId} className="flex items-start gap-2 bg-muted/50 rounded-lg p-2">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => moveExerciseUp(index)}
                              disabled={index === 0}
                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
                              aria-label="Przesuń w górę"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => moveExerciseDown(index)}
                              disabled={index === selectedExercises.length - 1}
                              className="w-6 h-6 flex items-center justify-center rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-smooth"
                              aria-label="Przesuń w dół"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {exercise?.name}
                            </p>
                            <Input
                              type="text"
                              value={exerciseSets[exerciseId] || ''}
                              onChange={(e) => setExerciseSets({ ...exerciseSets, [exerciseId]: e.target.value })}
                              placeholder="np. 3x10 80kg"
                              className="mt-1 text-xs h-8"
                            />
                          </div>
                          <button
                            onClick={() => removeExercise(exerciseId)}
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-destructive/20 transition-smooth"
                            aria-label="Usuń ćwiczenie"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
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
                onClick={() => setIsDeleteDialogOpen(true)}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Szczegóły treningu"
      >
        {previewTraining && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">{previewTraining.name}</h3>
              <p className="text-sm text-muted-foreground">{previewTraining.day}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Ćwiczenia:</h4>
              <div className="space-y-2">
                {previewTraining.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-muted-foreground mt-0.5">
                        {index + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{exercise.name}</p>
                        {exercise.setsText && (
                          <p className="text-xs text-muted-foreground mt-1">{exercise.setsText}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={openEditFromPreview} className="flex-1">
                <Edit2 className="w-4 h-4 mr-2" />
                Edytuj
              </Button>
              <Button
                onClick={() => setIsDeleteDialogOpen(true)}
                variant="destructive"
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Usuń
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Na pewno usunąć trening?</AlertDialogTitle>
            <AlertDialogDescription>
              Ta akcja nie może być cofnięta. Trening "{previewTraining?.name}" zostanie trwale usunięty z planu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTraining}>
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Plan;
