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
