import { sampleExercises, Exercise } from '@/data/exercises.sample';

// Flag to switch between local data and backend API
const USE_LOCAL_DATA = true;

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchExercisesByMuscle = async (muscleId: string): Promise<Exercise[]> => {
  if (USE_LOCAL_DATA) {
    await delay(300); // Simulate network delay
    return sampleExercises.filter(ex => ex.muscle === muscleId);
  }
  
  // Future backend implementation:
  // const response = await fetch(`/api/exercises?muscle=${muscleId}`);
  // return response.json();
  
  return [];
};

export const fetchExerciseById = async (exerciseId: string): Promise<Exercise | null> => {
  if (USE_LOCAL_DATA) {
    await delay(200);
    return sampleExercises.find(ex => ex.id === exerciseId) || null;
  }
  
  // Future backend implementation:
  // const response = await fetch(`/api/exercises/${exerciseId}`);
  // return response.json();
  
  return null;
};

export interface SearchFilters {
  equipment?: string;
  muscle?: string;
}

export const searchExercises = async (
  query: string,
  filters?: SearchFilters
): Promise<Exercise[]> => {
  if (USE_LOCAL_DATA) {
    await delay(300);
    
    let results = sampleExercises;
    
    // Apply search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(ex =>
        ex.name.toLowerCase().includes(lowerQuery) ||
        ex.description.toLowerCase().includes(lowerQuery) ||
        ex.equipment.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply filters
    if (filters?.equipment) {
      results = results.filter(ex =>
        ex.equipment.toLowerCase().includes(filters.equipment!.toLowerCase())
      );
    }
    
    if (filters?.muscle) {
      results = results.filter(ex => ex.muscle === filters.muscle);
    }
    
    return results;
  }
  
  // Future backend implementation:
  // const params = new URLSearchParams({ query, ...filters });
  // const response = await fetch(`/api/exercises/search?${params}`);
  // return response.json();
  
  return [];
};
