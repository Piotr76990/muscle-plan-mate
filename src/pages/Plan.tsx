import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { Modal } from '@/components/Modal';
import { Calendar, Plus, Trash2, X, ArrowUp, ArrowDown, Edit2, CheckCircle2, Save, FileText, Copy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { movePlanToHistory } from '@/utils/storage';
import { getAllTemplates, saveTemplate, deleteTemplate, Template } from '@/utils/templateStorage';
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
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isDeleteTemplateDialogOpen, setIsDeleteTemplateDialogOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Poniedziałek');
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [previewTraining, setPreviewTraining] = useState<Training | null>(null);
  
  // Template state
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  
  // Form state
  const [trainingName, setTrainingName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [exerciseSets, setExerciseSets] = useState<Record<string, string>>({});
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('klatka');
  
  // Muscle groups in desired order - all categories from exercises.sample.ts
  const muscleGroups = [
    { id: 'klatka', name: 'Klatka' },
    { id: 'plecy', name: 'Plecy' },
    { id: 'barki', name: 'Barki' },
    { id: 'biceps', name: 'Biceps' },
    { id: 'triceps', name: 'Triceps' },
    { id: 'przedramie', name: 'Przedramię' },
    { id: 'czworoglowy', name: 'Czworogłowy uda' },
    { id: 'dwuglowy', name: 'Dwugłowy uda' },
    { id: 'posladki', name: 'Pośladki' },
    { id: 'lydki', name: 'Łydki' },
    { id: 'brzuch', name: 'Brzuch' },
    { id: 'kardio', name: 'Kardio' },
  ];

  // Load trainings and templates from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTrainings(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load trainings', e);
      }
    }
    setTemplates(getAllTemplates());
  }, []);

  // Save trainings to localStorage
  const saveTrainings = (newTrainings: Training[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrainings));
    setTrainings(newTrainings);
  };

  const refreshTemplates = () => {
    setTemplates(getAllTemplates());
  };

  const openNewTrainingModal = (day?: string, preselectedTemplateId?: string) => {
    setSelectedDay(day || 'Poniedziałek');
    setTrainingName('');
    setSelectedExercises([]);
    setExerciseSets({});
    setSelectedMuscleGroup('klatka');
    setEditingTraining(null);
    setSelectedTemplateId('');
    
    // If template preselected, apply it
    if (preselectedTemplateId) {
      const template = templates.find(t => t.id === preselectedTemplateId);
      if (template) {
        applyTemplateToForm(template);
      }
    }
    
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
    setSelectedTemplateId('');
    setIsModalOpen(true);
  };

  const openSaveAsTemplateModal = () => {
    if (!previewTraining) return;
    setTemplateName(previewTraining.name);
    setTemplateDescription('');
    setIsTemplateModalOpen(true);
  };

  const handleSaveAsTemplate = () => {
    if (!previewTraining) return;
    if (!templateName.trim()) {
      toast.error('Nazwa szablonu nie może być pusta');
      return;
    }

    saveTemplate({
      name: templateName.trim(),
      description: templateDescription.trim() || undefined,
      exercises: previewTraining.exercises.map(e => ({
        id: e.id,
        name: e.name,
        setsText: e.setsText,
      })),
    });

    refreshTemplates();
    toast.success('Szablon zapisany');
    setIsTemplateModalOpen(false);
  };

  const applyTemplateToForm = (template: Template) => {
    if (!trainingName.trim()) {
      setTrainingName(template.name);
    }
    const exerciseIds = template.exercises.map(e => e.id);
    setSelectedExercises(exerciseIds);
    const sets: Record<string, string> = {};
    template.exercises.forEach(e => {
      if (e.setsText) sets[e.id] = e.setsText;
    });
    setExerciseSets(sets);
  };

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === 'none') {
      setSelectedTemplateId('');
      return;
    }
    
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    // If exercises already selected, confirm overwrite
    if (selectedExercises.length > 0) {
      if (confirm('Wybranie szablonu nadpisze aktualnie wybrane ćwiczenia. Kontynuować?')) {
        setSelectedTemplateId(templateId);
        applyTemplateToForm(template);
      }
    } else {
      setSelectedTemplateId(templateId);
      applyTemplateToForm(template);
    }
  };

  const handleDeleteTemplate = (template: Template) => {
    setTemplateToDelete(template);
    setIsDeleteTemplateDialogOpen(true);
  };

  const confirmDeleteTemplate = () => {
    if (!templateToDelete) return;
    deleteTemplate(templateToDelete.id);
    refreshTemplates();
    toast.success('Szablon usunięty');
    setIsDeleteTemplateDialogOpen(false);
    setTemplateToDelete(null);
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

  const confirmCompleteTraining = () => {
    if (!previewTraining) return;
    
    const success = movePlanToHistory(previewTraining.day);
    
    if (success) {
      // Reload trainings from localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTrainings(JSON.parse(stored));
      }
      
      toast.success('Trening oznaczony jako wykonany');
      setIsCompleteDialogOpen(false);
      setIsPreviewOpen(false);
      setPreviewTraining(null);
    } else {
      toast.error('Nie udało się przenieść treningu');
    }
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

  const getExercisesForGroup = (groupId: string) => {
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

          {/* Templates Section */}
          {templates.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Twoje szablony treningów
              </h3>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/50 flex items-center justify-center flex-shrink-0">
                        <Copy className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{template.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {template.exercises.length} ćwiczeń
                          {template.description && ` • ${template.description}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => openNewTrainingModal(undefined, template.id)}
                          size="sm"
                          variant="outline"
                          className="min-h-[44px]"
                        >
                          Użyj
                        </Button>
                        <Button
                          onClick={() => handleDeleteTemplate(template)}
                          size="sm"
                          variant="ghost"
                          className="min-h-[44px] text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              💡 Kliknij dzień, aby dodać lub edytować trening. Zapisuj treningi jako szablony, aby szybko tworzyć nowe plany.
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
          {/* Template Selection */}
          {!editingTraining && templates.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Wybierz szablon (opcjonalnie)
              </label>
              <Select value={selectedTemplateId || 'none'} onValueChange={handleTemplateSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Brak — wybierz szablon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Brak — utwórz od zera</SelectItem>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} ({template.exercises.length} ćw.)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
                {getExercisesForGroup(selectedMuscleGroup).map(exercise => (
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

            <div className="flex flex-col gap-2 pt-4">
              <Button 
                onClick={() => setIsCompleteDialogOpen(true)}
                className="w-full bg-success hover:bg-success/90 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Wykonane
              </Button>
              <Button
                onClick={openSaveAsTemplateModal}
                variant="secondary"
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                Zapisz jako szablon
              </Button>
              <div className="flex gap-2">
                <Button onClick={openEditFromPreview} variant="outline" className="flex-1">
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
          </div>
        )}
      </Modal>

      {/* Save as Template Modal */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Zapisz jako szablon"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nazwa szablonu *
            </label>
            <Input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="np. Push Day A"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Opis (opcjonalnie)
            </label>
            <Input
              type="text"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="np. Klatka, barki, triceps"
              className="w-full"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSaveAsTemplate} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Zapisz szablon
            </Button>
            <Button onClick={() => setIsTemplateModalOpen(false)} variant="outline" className="flex-1">
              Anuluj
            </Button>
          </div>
        </div>
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

      {/* Delete Template Confirmation Dialog */}
      <AlertDialog open={isDeleteTemplateDialogOpen} onOpenChange={setIsDeleteTemplateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usunąć szablon?</AlertDialogTitle>
            <AlertDialogDescription>
              Szablon "{templateToDelete?.name}" zostanie trwale usunięty. Istniejące treningi nie zostaną zmienione.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteTemplate}>
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Complete Training Confirmation Dialog */}
      <AlertDialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Oznaczyć trening jako wykonany?</AlertDialogTitle>
            <AlertDialogDescription>
              Trening "{previewTraining?.name}" zostanie przeniesiony do Treningi historyczne i usunięty z planu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCompleteTraining}
              className="bg-success hover:bg-success/90"
            >
              Oznacz jako wykonany
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Plan;
