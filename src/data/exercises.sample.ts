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
    muscle: 'klatka',
    description: 'Podstawowe ćwiczenie na klatkę piersiową. Ułóż się na ławce, chwyć sztangę nieco szerzej niż szerokość barków.',
    equipment: 'Sztanga, ławka',
  },
  {
    id: 'chest-2',
    name: 'Pompki',
    muscle: 'klatka',
    description: 'Klasyczne ćwiczenie z własną masą ciała. Utrzymuj proste plecy i napinaj mięśnie brzucha.',
    equipment: 'Własna masa ciała',
  },
  {
    id: 'chest-3',
    name: 'Rozpiętki z hantlami',
    muscle: 'klatka',
    description: 'Izolowane ćwiczenie na klatkę. Opuść hantle w łuk z lekko ugiętymi łokciami.',
    equipment: 'Hantle, ławka',
  },

  // Plecy
  {
    id: 'back-1',
    name: 'Podciąganie na drążku',
    muscle: 'plecy',
    description: 'Kompleksowe ćwiczenie na plecy. Chwyć drążek szeroko, podciągnij klatkę do drążka.',
    equipment: 'Drążek',
  },
  {
    id: 'back-2',
    name: 'Wiosłowanie sztangą',
    muscle: 'plecy',
    description: 'Podstawowe ćwiczenie na grubość pleców. Pochyl się do przodu, przyciągnij sztangę do brzucha.',
    equipment: 'Sztanga',
  },
  {
    id: 'back-3',
    name: 'Martwy ciąg',
    muscle: 'plecy',
    description: 'Kompleksowe ćwiczenie na całe ciało. Podnieś sztangę z ziemi, utrzymując proste plecy.',
    equipment: 'Sztanga',
  },

  // Barki
  {
    id: 'shoulders-1',
    name: 'Wyciskanie sztangi OHP',
    muscle: 'barki',
    description: 'Podstawowe ćwiczenie na barki. Wyciśnij sztangę nad głową w pozycji stojącej.',
    equipment: 'Sztanga',
  },
  {
    id: 'shoulders-2',
    name: 'Wznosy boczne hantli',
    muscle: 'barki',
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

  // Brzuch
  {
    id: 'abs-1',
    name: 'Brzuszki',
    muscle: 'brzuch',
    description: 'Klasyczne ćwiczenie na górną partię brzucha. Unieś tułów do kolan.',
    equipment: 'Własna masa ciała',
  },
  {
    id: 'abs-2',
    name: 'Plank',
    muscle: 'brzuch',
    description: 'Izometryczne ćwiczenie na cały core. Utrzymuj ciało w linii prostej.',
    equipment: 'Własna masa ciała',
  },

  // Czworogłowy uda
  {
    id: 'quads-1',
    name: 'Przysiad ze sztangą',
    muscle: 'czworoglowy',
    description: 'Król ćwiczeń na nogi. Zegnij kolana i biodra, schodząc maksymalnie nisko.',
    equipment: 'Sztanga, stojak',
  },
  {
    id: 'quads-2',
    name: 'Wypychanie nóg na suwnicy',
    muscle: 'czworoglowy',
    description: 'Ćwiczenie na maszynie. Wypychaj platformę całą stopą, kontroluj ruch.',
    equipment: 'Suwnica',
  },

  // Dwugłowy uda
  {
    id: 'hamstrings-1',
    name: 'Martwy ciąg na prostych nogach',
    muscle: 'dwuglowy',
    description: 'Ćwiczenie na tylną część uda. Pochyl się z prostymi nogami, sztanga blisko nóg.',
    equipment: 'Sztanga',
  },
  {
    id: 'hamstrings-2',
    name: 'Uginanie nóg na maszynie',
    muscle: 'dwuglowy',
    description: 'Izolowane ćwiczenie na tylną część uda. Ugnij nogi w kolanach.',
    equipment: 'Maszyna',
  },

  // Pośladki
  {
    id: 'glutes-1',
    name: 'Hip thrust',
    muscle: 'posladki',
    description: 'Najlepsze ćwiczenie na pośladki. Wypychaj biodra w górę z ławki.',
    equipment: 'Sztanga, ławka',
  },
  {
    id: 'glutes-2',
    name: 'Wykroki z hantlami',
    muscle: 'posladki',
    description: 'Jednostronne ćwiczenie na nogi i pośladki. Zrób długi krok do przodu.',
    equipment: 'Hantle',
  },

  // Łydki
  {
    id: 'calves-1',
    name: 'Wspięcia na palce stojąc',
    muscle: 'lydki',
    description: 'Podstawowe ćwiczenie na łydki. Wspnij się na palce, maksymalnie napinając mięśnie.',
    equipment: 'Maszyna lub hantle',
  },
  {
    id: 'calves-2',
    name: 'Wspięcia na palce siedząc',
    muscle: 'lydki',
    description: 'Ćwiczenie na płaszczczyznową część łydki. Wspnij się na palce w pozycji siedzącej.',
    equipment: 'Maszyna',
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
    klatka: 'Klatka piersiowa',
    plecy: 'Plecy',
    barki: 'Barki',
    biceps: 'Biceps',
    triceps: 'Triceps',
    brzuch: 'Brzuch',
    czworoglowy: 'Czworogłowy uda',
    dwuglowy: 'Dwugłowy uda',
    posladki: 'Pośladki',
    lydki: 'Łydki',
  };
  return names[muscle] || muscle;
};
