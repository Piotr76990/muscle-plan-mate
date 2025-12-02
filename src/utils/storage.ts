/**
 * LocalStorage wrapper for app data
 * Keys: workouts_v1, plan_v1, weights_v1
 */

export const storage = {
  getItem: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  setItem: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// Storage keys
export const STORAGE_KEYS = {
  WORKOUTS: 'workouts_v1',
  PLAN: 'plan_v1',
  WEIGHTS: 'weights_v1',
} as const;

// Weight helpers
export interface WeightEntry {
  id: string;
  date: string; // ISO string
  weightKg: number;
  note?: string;
}

// Workout helpers
export interface Workout {
  id: string;
  date: string;
  title: string;
  exercises: Array<{
    id: string;
    name: string;
    setsText?: string;
    sets?: Array<{ reps: number; weight: number }>;
  }>;
  duration?: string;
  fromDay?: string;
  notes?: string;
}

// Plan helpers
export interface Plan {
  id: string;
  day: string;
  name: string;
  exercises: Array<{
    id: string;
    name: string;
    setsText?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export const getAllWorkouts = (): Workout[] => {
  const workouts = storage.getItem<Workout[]>(STORAGE_KEYS.WORKOUTS);
  return workouts || [];
};

export const getWorkoutById = (id: string): Workout | null => {
  const workouts = getAllWorkouts();
  return workouts.find(w => w.id === id) || null;
};

export const deleteWorkoutById = (id: string): void => {
  const workouts = getAllWorkouts();
  const filtered = workouts.filter(w => w.id !== id);
  storage.setItem(STORAGE_KEYS.WORKOUTS, filtered);
};

// Plan management
export const getAllPlans = (): Plan[] => {
  const plans = storage.getItem<Plan[]>(STORAGE_KEYS.PLAN);
  return plans || [];
};

export const getPlanForDay = (day: string): Plan | null => {
  const plans = getAllPlans();
  return plans.find(p => p.day === day) || null;
};

export const deletePlanForDay = (day: string): void => {
  const plans = getAllPlans();
  const filtered = plans.filter(p => p.day !== day);
  storage.setItem(STORAGE_KEYS.PLAN, filtered);
};

// Move plan to history
export const movePlanToHistory = (day: string): boolean => {
  const plan = getPlanForDay(day);
  if (!plan) return false;

  // Create workout from plan
  const workout: Workout = {
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    title: plan.name,
    exercises: plan.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      setsText: ex.setsText,
    })),
    fromDay: plan.day,
  };

  // Save to workouts
  const workouts = getAllWorkouts();
  storage.setItem(STORAGE_KEYS.WORKOUTS, [...workouts, workout]);

  // Remove from plan
  deletePlanForDay(day);

  return true;
};

// Weight management
export const getAllWeights = (): WeightEntry[] => {
  const weights = storage.getItem<WeightEntry[]>(STORAGE_KEYS.WEIGHTS);
  if (!weights) return [];
  // Sort oldest -> newest for chart
  return weights.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const saveWeight = (weight: Omit<WeightEntry, 'id'>): WeightEntry => {
  const weights = storage.getItem<WeightEntry[]>(STORAGE_KEYS.WEIGHTS) || [];
  const newWeight: WeightEntry = {
    ...weight,
    id: `weight_${Date.now()}`,
  };
  storage.setItem(STORAGE_KEYS.WEIGHTS, [...weights, newWeight]);
  return newWeight;
};

export const updateWeight = (id: string, updates: Partial<Omit<WeightEntry, 'id'>>): boolean => {
  const weights = storage.getItem<WeightEntry[]>(STORAGE_KEYS.WEIGHTS) || [];
  const index = weights.findIndex(w => w.id === id);
  if (index === -1) return false;
  
  weights[index] = { ...weights[index], ...updates };
  storage.setItem(STORAGE_KEYS.WEIGHTS, weights);
  return true;
};

export const deleteWeight = (id: string): boolean => {
  const weights = storage.getItem<WeightEntry[]>(STORAGE_KEYS.WEIGHTS) || [];
  const filtered = weights.filter(w => w.id !== id);
  if (filtered.length === weights.length) return false;
  
  storage.setItem(STORAGE_KEYS.WEIGHTS, filtered);
  return true;
};

export const exportWeightsCSV = (): string => {
  const weights = getAllWeights();
  const header = 'date,weightKg,note\n';
  const rows = weights.map(w => 
    `${w.date},${w.weightKg},"${(w.note || '').replace(/"/g, '""')}"`
  ).join('\n');
  return header + rows;
};
