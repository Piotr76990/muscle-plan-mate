export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  description: string;
  equipment: string;
}

export const sampleExercises: Exercise[] = [
  // Klatka piersiowa
  {
    id: 'chest-1',
    name: 'Wyciskanie sztangi na ławce płaskiej',
    muscle: 'chest',
    description: 'Podstawowe ćwiczenie na klatkę piersiową. Ułóż się na ławce, chwyć sztangę nieco szerzej niż szerokość barków.',
    equipment: 'Sztanga, ławka',
  },
  {
    id: 'chest-2',
    name: 'Pompki',
    muscle: 'chest',
    description: 'Klasyczne ćwiczenie z własną masą ciała. Utrzymuj proste plecy i napinaj mięśnie brzucha.',
    equipment: 'Własna masa ciała',
  },
  {
    id: 'chest-3',
    name: 'Rozpiętki z hantlami',
    muscle: 'chest',
    description: 'Izolowane ćwiczenie na klatkę. Opuść hantle w łuk z lekko ugiętymi łokciami.',
    equipment: 'Hantle, ławka',
  },

  // Plecy
  {
    id: 'back-1',
    name: 'Podciąganie na drążku',
    muscle: 'back',
    description: 'Kompleksowe ćwiczenie na plecy. Chwyć drążek szeroko, podciągnij klatkę do drążka.',
    equipment: 'Drążek',
  },
  {
    id: 'back-2',
    name: 'Wiosłowanie sztangą',
    muscle: 'back',
    description: 'Podstawowe ćwiczenie na grubość pleców. Pochyl się do przodu, przyciągnij sztangę do brzucha.',
    equipment: 'Sztanga',
  },
  {
    id: 'back-3',
    name: 'Martwy ciąg',
    muscle: 'back',
    description: 'Kompleksowe ćwiczenie na całe ciało. Podnieś sztangę z ziemi, utrzymując proste plecy.',
    equipment: 'Sztanga',
  },

  // Nogi
  {
    id: 'legs-1',
    name: 'Przysiad ze sztangą',
    muscle: 'legs',
    description: 'Król ćwiczeń na nogi. Zegnij kolana i biodra, schodząc maksymalnie nisko.',
    equipment: 'Sztanga, stojak',
  },
  {
    id: 'legs-2',
    name: 'Wykroki z hantlami',
    muscle: 'legs',
    description: 'Jednostronne ćwiczenie na nogi. Zrób długi krok do przodu, zegnij oba kolana.',
    equipment: 'Hantle',
  },
  {
    id: 'legs-3',
    name: 'Wypychanie nóg na suwnicy',
    muscle: 'legs',
    description: 'Ćwiczenie na maszynie. Wypychaj platformę całą stopą, kontroluj ruch.',
    equipment: 'Suwnica',
  },

  // Barki
  {
    id: 'shoulders-1',
    name: 'Wyciskanie sztangi OHP',
    muscle: 'shoulders',
    description: 'Podstawowe ćwiczenie na barki. Wyciśnij sztangę nad głową w pozycji stojącej.',
    equipment: 'Sztanga',
  },
  {
    id: 'shoulders-2',
    name: 'Wznosy boczne hantli',
    muscle: 'shoulders',
    description: 'Izolowane ćwiczenie na środkową część barków. Unieś hantle na boki do poziomu barków.',
    equipment: 'Hantle',
  },

  // Biceps
  {
    id: 'biceps-1',
    name: 'Uginanie ramion ze sztangą',
    muscle: 'biceps',
    description: 'Podstawowe ćwiczenie na biceps. Ugnij przedramiona, przyciągając sztangę do klatki.',
    equipment: 'Sztanga',
  },
  {
    id: 'biceps-2',
    name: 'Uginanie ramion z hantlami',
    muscle: 'biceps',
    description: 'Uniwersalne ćwiczenie na biceps. Możliwość rotacji nadgarstków podczas ruchu.',
    equipment: 'Hantle',
  },

  // Triceps
  {
    id: 'triceps-1',
    name: 'Wyciskanie francuskie',
    muscle: 'triceps',
    description: 'Izolowane ćwiczenie na triceps. Opuść sztangę za głowę, utrzymując ramiona pionowo.',
    equipment: 'Sztanga, ławka',
  },
  {
    id: 'triceps-2',
    name: 'Pompki na poręczach',
    muscle: 'triceps',
    description: 'Kompleksowe ćwiczenie z własną masą ciała. Pochyl tułów lekko do przodu.',
    equipment: 'Poręcze',
  },
];

export const getMuscleGroups = (): string[] => {
  const muscles = new Set(sampleExercises.map(ex => ex.muscle));
  return Array.from(muscles);
};

export const getExercisesByMuscle = (muscle: string): Exercise[] => {
  return sampleExercises.filter(ex => ex.muscle === muscle);
};

export const getMuscleDisplayName = (muscle: string): string => {
  const names: Record<string, string> = {
    chest: 'Klatka piersiowa',
    back: 'Plecy',
    legs: 'Nogi',
    shoulders: 'Barki',
    biceps: 'Biceps',
    triceps: 'Triceps',
  };
  return names[muscle] || muscle;
};
