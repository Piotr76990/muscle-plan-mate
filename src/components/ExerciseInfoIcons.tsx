import { Dumbbell, User, Target, TrendingUp, Zap, ArrowUp, ArrowDown, RotateCw, Heart } from 'lucide-react';
import { Exercise } from '@/data/exercises.sample';

interface ExerciseInfoIconsProps {
  exercise: Exercise;
}

const getEquipmentIcon = (equipment: string) => {
  const lower = equipment.toLowerCase();
  if (lower.includes('sztanga') || lower.includes('barbell')) {
    return Dumbbell;
  }
  if (lower.includes('hantle') || lower.includes('dumbbell')) {
    return Dumbbell;
  }
  if (lower.includes('własna masa') || lower.includes('bodyweight')) {
    return User;
  }
  if (lower.includes('maszyna') || lower.includes('suwnica')) {
    return Target;
  }
  return Dumbbell;
};

const getEquipmentLabel = (equipment: string): string => {
  const lower = equipment.toLowerCase();
  if (lower.includes('własna masa') || lower.includes('bodyweight')) {
    return 'Masa ciała';
  }
  if (lower.includes('sztanga')) return 'Sztanga';
  if (lower.includes('hantle')) return 'Hantle';
  if (lower.includes('maszyna') || lower.includes('suwnica')) return 'Maszyna';
  if (lower.includes('drążek')) return 'Drążek';
  if (lower.includes('poręcze')) return 'Poręcze';
  return 'Sprzęt';
};

const getMuscleIcon = (muscle: string) => {
  const lower = muscle.toLowerCase();
  if (lower === 'kardio') return Heart;
  return Target;
};

const getMuscleLabel = (muscle: string): string => {
  const names: Record<string, string> = {
    klatka: 'Klatka',
    plecy: 'Plecy',
    barki: 'Barki',
    biceps: 'Biceps',
    przedramie: 'Przedramię',
    triceps: 'Triceps',
    brzuch: 'Brzuch',
    czworoglowy: 'Uda',
    dwuglowy: 'Uda',
    posladki: 'Pośladki',
    lydki: 'Łydki',
    kardio: 'Kardio',
  };
  return names[muscle] || muscle;
};

const getDifficulty = (exercise: Exercise): { level: string; label: string } => {
  const name = exercise.name.toLowerCase();
  const equipment = exercise.equipment.toLowerCase();
  
  // Hard exercises
  if (name.includes('martwy ciąg') || name.includes('przysiad ze sztangą') || 
      name.includes('podciąganie') || name.includes('ohp')) {
    return { level: 'hard', label: 'Trudne' };
  }
  
  // Easy exercises
  if (name.includes('pompki') || name.includes('brzuszki') || name.includes('plank') ||
      name.includes('skakanka') || equipment.includes('własna masa')) {
    return { level: 'easy', label: 'Łatwe' };
  }
  
  // Medium by default
  return { level: 'medium', label: 'Średnie' };
};

const getDifficultyIcon = (level: string) => {
  switch (level) {
    case 'easy': return TrendingUp;
    case 'hard': return Zap;
    default: return TrendingUp;
  }
};

const getMovementType = (exercise: Exercise): { type: string; label: string } => {
  const name = exercise.name.toLowerCase();
  const muscle = exercise.muscle.toLowerCase();
  
  if (muscle === 'kardio') {
    return { type: 'cardio', label: 'Kardio' };
  }
  
  if (muscle === 'brzuch' || name.includes('plank')) {
    return { type: 'core', label: 'Core' };
  }
  
  // Push movements
  if (name.includes('wyciskanie') || name.includes('pompki') || name.includes('wypychanie') ||
      muscle === 'klatka' || muscle === 'barki' || muscle === 'triceps') {
    return { type: 'push', label: 'Push' };
  }
  
  // Pull movements
  if (name.includes('podciąganie') || name.includes('wiosłowanie') || name.includes('uginanie') ||
      name.includes('martwy') || muscle === 'plecy' || muscle === 'biceps') {
    return { type: 'pull', label: 'Pull' };
  }
  
  // Isolation
  if (name.includes('wznosy') || name.includes('rozpiętki') || name.includes('wspięcia')) {
    return { type: 'isolation', label: 'Izolacja' };
  }
  
  return { type: 'compound', label: 'Złożone' };
};

const getMovementIcon = (type: string) => {
  switch (type) {
    case 'push': return ArrowUp;
    case 'pull': return ArrowDown;
    case 'cardio': return Heart;
    case 'core': return RotateCw;
    default: return RotateCw;
  }
};

export const ExerciseInfoIcons = ({ exercise }: ExerciseInfoIconsProps) => {
  const EquipmentIcon = getEquipmentIcon(exercise.equipment);
  const MuscleIcon = getMuscleIcon(exercise.muscle);
  const difficulty = getDifficulty(exercise);
  const DifficultyIcon = getDifficultyIcon(difficulty.level);
  const movement = getMovementType(exercise);
  const MovementIcon = getMovementIcon(movement.type);

  const items = [
    { icon: EquipmentIcon, label: getEquipmentLabel(exercise.equipment), sublabel: 'Sprzęt' },
    { icon: MuscleIcon, label: getMuscleLabel(exercise.muscle), sublabel: 'Mięśnie' },
    { icon: DifficultyIcon, label: difficulty.label, sublabel: 'Trudność' },
    { icon: MovementIcon, label: movement.label, sublabel: 'Ruch' },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <item.icon className="w-5 h-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">{item.sublabel}</span>
            <span className="text-sm font-medium text-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
