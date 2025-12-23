export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  description: string;
  equipment: string;
  imageUrl?: string;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80';

export const sampleExercises: Exercise[] = [
  // Klatka piersiowa
  {
    id: 'chest-1',
    name: 'Wyciskanie sztangi na ławce płaskiej',
    muscle: 'klatka',
    description: 'Podstawowe ćwiczenie na klatkę piersiową. Ułóż się na ławce, chwyć sztangę nieco szerzej niż szerokość barków.',
    equipment: 'Sztanga, ławka',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
  },
  {
    id: 'chest-2',
    name: 'Pompki',
    muscle: 'klatka',
    description: 'Klasyczne ćwiczenie z własną masą ciała. Utrzymuj proste plecy i napinaj mięśnie brzucha.',
    equipment: 'Własna masa ciała',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&q=80',
  },
  {
    id: 'chest-3',
    name: 'Rozpiętki z hantlami',
    muscle: 'klatka',
    description: 'Izolowane ćwiczenie na klatkę. Opuść hantle w łuk z lekko ugiętymi łokciami.',
    equipment: 'Hantle, ławka',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
  },

  // Plecy
  {
    id: 'back-1',
    name: 'Podciąganie na drążku',
    muscle: 'plecy',
    description: 'Kompleksowe ćwiczenie na plecy. Chwyć drążek szeroko, podciągnij klatkę do drążka.',
    equipment: 'Drążek',
    imageUrl: 'https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&q=80',
  },
  {
    id: 'back-2',
    name: 'Wiosłowanie sztangą',
    muscle: 'plecy',
    description: 'Podstawowe ćwiczenie na grubość pleców. Pochyl się do przodu, przyciągnij sztangę do brzucha.',
    equipment: 'Sztanga',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800&q=80',
  },
  {
    id: 'back-3',
    name: 'Martwy ciąg',
    muscle: 'plecy',
    description: 'Kompleksowe ćwiczenie na całe ciało. Podnieś sztangę z ziemi, utrzymując proste plecy.',
    equipment: 'Sztanga',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80',
  },

  // Barki
  {
    id: 'shoulders-1',
    name: 'Wyciskanie sztangi OHP',
    muscle: 'barki',
    description: 'Podstawowe ćwiczenie na barki. Wyciśnij sztangę nad głową w pozycji stojącej.',
    equipment: 'Sztanga',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
  },
  {
    id: 'shoulders-2',
    name: 'Wznosy boczne hantli',
    muscle: 'barki',
    description: 'Izolowane ćwiczenie na środkową część barków. Unieś hantle na boki do poziomu barków.',
    equipment: 'Hantle',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=800&q=80',
  },

  // Biceps
  {
    id: 'biceps-1',
    name: 'Uginanie ramion ze sztangą',
    muscle: 'biceps',
    description: 'Podstawowe ćwiczenie na biceps. Ugnij przedramiona, przyciągając sztangę do klatki.',
    equipment: 'Sztanga',
    imageUrl: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80',
  },
  {
    id: 'biceps-2',
    name: 'Uginanie ramion z hantlami',
    muscle: 'biceps',
    description: 'Uniwersalne ćwiczenie na biceps. Możliwość rotacji nadgarstków podczas ruchu.',
    equipment: 'Hantle',
    imageUrl: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800&q=80',
  },

  // Przedramiona
  {
    id: 'forearms-1',
    name: 'Uginanie nadgarstków ze sztangą',
    muscle: 'przedramie',
    description: 'Ćwiczenie na wewnętrzną część przedramion. Oprzyj przedramiona na ławce, uginaj nadgarstki.',
    equipment: 'Sztanga, ławka',
    imageUrl: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=800&q=80',
  },
  {
    id: 'forearms-2',
    name: 'Zwijanie nadgarstków odwrotnym chwytem',
    muscle: 'przedramie',
    description: 'Ćwiczenie na zewnętrzną część przedramion. Użyj odwrotnego chwytu.',
    equipment: 'Sztanga',
    imageUrl: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800&q=80',
  },
  {
    id: 'forearms-3',
    name: 'Farmer\'s Walk',
    muscle: 'przedramie',
    description: 'Chwyć ciężkie hantle i chodź z nimi. Rozwija siłę chwytu i przedramion.',
    equipment: 'Hantle',
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80',
  },

  // Triceps
  {
    id: 'triceps-1',
    name: 'Wyciskanie francuskie',
    muscle: 'triceps',
    description: 'Izolowane ćwiczenie na triceps. Opuść sztangę za głowę, utrzymując ramiona pionowo.',
    equipment: 'Sztanga, ławka',
    imageUrl: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=800&q=80',
  },
  {
    id: 'triceps-2',
    name: 'Pompki na poręczach',
    muscle: 'triceps',
    description: 'Kompleksowe ćwiczenie z własną masą ciała. Pochyl tułów lekko do przodu.',
    equipment: 'Poręcze',
    imageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=800&q=80',
  },

  // Brzuch
  {
    id: 'abs-1',
    name: 'Brzuszki',
    muscle: 'brzuch',
    description: 'Klasyczne ćwiczenie na górną partię brzucha. Unieś tułów do kolan.',
    equipment: 'Własna masa ciała',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    id: 'abs-2',
    name: 'Plank',
    muscle: 'brzuch',
    description: 'Izometryczne ćwiczenie na cały core. Utrzymuj ciało w linii prostej.',
    equipment: 'Własna masa ciała',
    imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&q=80',
  },

  // Czworogłowy uda
  {
    id: 'quads-1',
    name: 'Przysiad ze sztangą',
    muscle: 'czworoglowy',
    description: 'Król ćwiczeń na nogi. Zegnij kolana i biodra, schodząc maksymalnie nisko.',
    equipment: 'Sztanga, stojak',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
  },
  {
    id: 'quads-2',
    name: 'Wypychanie nóg na suwnicy',
    muscle: 'czworoglowy',
    description: 'Ćwiczenie na maszynie. Wypychaj platformę całą stopą, kontroluj ruch.',
    equipment: 'Suwnica',
    imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80',
  },

  // Dwugłowy uda
  {
    id: 'hamstrings-1',
    name: 'Martwy ciąg na prostych nogach',
    muscle: 'dwuglowy',
    description: 'Ćwiczenie na tylną część uda. Pochyl się z prostymi nogami, sztanga blisko nóg.',
    equipment: 'Sztanga',
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80',
  },
  {
    id: 'hamstrings-2',
    name: 'Uginanie nóg na maszynie',
    muscle: 'dwuglowy',
    description: 'Izolowane ćwiczenie na tylną część uda. Ugnij nogi w kolanach.',
    equipment: 'Maszyna',
    imageUrl: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800&q=80',
  },

  // Pośladki
  {
    id: 'glutes-1',
    name: 'Hip thrust',
    muscle: 'posladki',
    description: 'Najlepsze ćwiczenie na pośladki. Wypychaj biodra w górę z ławki.',
    equipment: 'Sztanga, ławka',
    imageUrl: 'https://images.unsplash.com/photo-1609899537878-48d8c4a8d52e?w=800&q=80',
  },
  {
    id: 'glutes-2',
    name: 'Wykroki z hantlami',
    muscle: 'posladki',
    description: 'Jednostronne ćwiczenie na nogi i pośladki. Zrób długi krok do przodu.',
    equipment: 'Hantle',
    imageUrl: 'https://images.unsplash.com/photo-1597452485677-d661670d9640?w=800&q=80',
  },

  // Łydki
  {
    id: 'calves-1',
    name: 'Wspięcia na palce stojąc',
    muscle: 'lydki',
    description: 'Podstawowe ćwiczenie na łydki. Wspnij się na palce, maksymalnie napinając mięśnie.',
    equipment: 'Maszyna lub hantle',
    imageUrl: 'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=800&q=80',
  },
  {
    id: 'calves-2',
    name: 'Wspięcia na palce siedząc',
    muscle: 'lydki',
    description: 'Ćwiczenie na płaszczczyznową część łydki. Wspnij się na palce w pozycji siedzącej.',
    equipment: 'Maszyna',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
  },

  // Kardio
  {
    id: 'cardio-1',
    name: 'Bieg na bieżni',
    muscle: 'kardio',
    description: 'Podstawowe ćwiczenie cardio. Zacznij od rozgrzewki, stopniowo zwiększaj tempo.',
    equipment: 'Bieżnia',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80',
  },
  {
    id: 'cardio-2',
    name: 'Rower stacjonarny',
    muscle: 'kardio',
    description: 'Ćwiczenie o niskim obciążeniu stawów. Reguluj opór i tempo pedałowania.',
    equipment: 'Rower stacjonarny',
    imageUrl: 'https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=800&q=80',
  },
  {
    id: 'cardio-3',
    name: 'Skakanka',
    muscle: 'kardio',
    description: 'Intensywne cardio z własną masą ciała. Skacz na palcach, utrzymuj równe tempo.',
    equipment: 'Skakanka',
    imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
  },
  {
    id: 'cardio-4',
    name: 'Wioślarz',
    muscle: 'kardio',
    description: 'Kompleksowe ćwiczenie angażujące całe ciało. Pchaj nogami, ciągnij ramionami.',
    equipment: 'Wioślarz',
    imageUrl: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=800&q=80',
  },
  {
    id: 'cardio-5',
    name: 'Orbitrek',
    muscle: 'kardio',
    description: 'Cardio bez obciążenia stawów. Płynne ruchy nóg i rąk naprzemiennie.',
    equipment: 'Orbitrek',
    imageUrl: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80',
  },
  {
    id: 'cardio-6',
    name: 'Basen',
    muscle: 'kardio',
    description: 'Pływanie to doskonałe cardio angażujące całe ciało. Rozwija wytrzymałość i siłę mięśni.',
    equipment: 'Basen',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
  },
  {
    id: 'cardio-7',
    name: 'Piłka',
    muscle: 'kardio',
    description: 'Trening z piłką - gra rekreacyjna lub ćwiczenia techniczne. Świetne cardio i koordynacja.',
    equipment: 'Piłka',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
  },
  {
    id: 'cardio-8',
    name: 'Piłka mecz',
    muscle: 'kardio',
    description: 'Mecz piłkarski - intensywne cardio z elementami sprintu, zmian kierunku i gry zespołowej.',
    equipment: 'Piłka, boisko',
    imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
  },
];

export const getPlaceholderImage = () => PLACEHOLDER_IMAGE;

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
    przedramie: 'Przedramiona',
    triceps: 'Triceps',
    brzuch: 'Brzuch',
    czworoglowy: 'Czworogłowy uda',
    dwuglowy: 'Dwugłowy uda',
    posladki: 'Pośladki',
    lydki: 'Łydki',
    kardio: 'Kardio',
  };
  return names[muscle] || muscle;
};
