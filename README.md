# GymTracker - PWA Workout Planner

Nowoczesna aplikacja webowa (PWA) do planowania i śledzenia treningów, zbudowana w React + Vite + TailwindCSS.

## 🚀 Funkcjonalności

- **Mapa mięśni** - Przeglądaj ćwiczenia według grup mięśniowych
- **Plan treningowy** - Planuj treningi na cały tydzień
- **Historia i progres** - Śledź wykonane treningi i postępy
- **Tracker wagi** - Monitoruj swoją wagę i kompozycję ciała
- **Offline support** - Działa bez połączenia z internetem dzięki Service Worker
- **Installable** - Możliwość instalacji jako aplikacja na urządzeniach mobilnych

## 📱 Instalacja jako PWA

### Na iPhone:
1. Otwórz aplikację w Safari
2. Kliknij przycisk "Udostępnij" (ikona ze strzałką)
3. Przewiń w dół i wybierz "Dodaj do ekranu początkowego"
4. Kliknij "Dodaj" w prawym górnym rogu
5. Aplikacja pojawi się na ekranie głównym jako ikona

### Na Android:
1. Otwórz aplikację w Chrome
2. Kliknij menu (trzy kropki)
3. Wybierz "Zainstaluj aplikację" lub "Dodaj do ekranu głównego"
4. Potwierdź instalację

## 🛠️ Uruchomienie lokalne

### Wymagania
- Node.js (v18 lub nowszy)
- npm lub yarn

### Instalacja

```bash
# Klonowanie repozytorium
git clone <your-repo-url>
cd gymtracker

# Instalacja zależności
npm install

# Uruchomienie w trybie deweloperskim
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu produkcyjnego
npm run preview
```

Aplikacja będzie dostępna pod adresem `http://localhost:8080`

## 📂 Struktura projektu

```
src/
├── components/          # Komponenty UI
│   ├── BottomNav.tsx   # Dolny pasek nawigacji (mobile)
│   ├── Header.tsx      # Nagłówek aplikacji
│   ├── Card.tsx        # Karty nawigacyjne
│   ├── ExerciseCard.tsx # Karty ćwiczeń
│   ├── Modal.tsx       # Okno modalne
│   └── Toast.tsx       # Powiadomienia
├── pages/              # Strony aplikacji
│   ├── Home.tsx        # Strona główna
│   ├── MuscleMap.tsx   # Mapa mięśni
│   ├── Exercises.tsx   # Lista ćwiczeń
│   ├── Plan.tsx        # Plan treningowy
│   ├── History.tsx     # Historia treningów
│   └── Weight.tsx      # Tracker wagi
├── data/               # Dane aplikacji
│   └── exercises.sample.ts # Przykładowe ćwiczenia
├── utils/              # Narzędzia
│   └── storage.ts      # Wrapper dla localStorage
├── App.tsx             # Główny komponent
└── main.tsx           # Entry point

public/
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── icon-192.png       # Ikona PWA 192x192
└── icon-512.png       # Ikona PWA 512x512
```

## 💾 LocalStorage

Aplikacja używa localStorage do przechowywania danych:
- `workouts_v1` - Historia wykonanych treningów
- `plan_v1` - Plan treningowy
- `weights_v1` - Pomiary wagi

Wszystkie operacje na storage są obudowane wrapperem w `src/utils/storage.ts`.

## 🎨 Design System

Aplikacja używa spójnego systemu designu opartego na:
- **Primary Color**: Cyan (#0891b2) - energetyczny niebieski
- **Accent Color**: Orange (#ea580c) - akcenty i CTA
- **Komponenty**: shadcn/ui + własne komponenty
- **Responsywność**: Mobile-first approach
- **Touch targets**: Minimum 44px dla komfortu na mobile

## 🔧 Technologie

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Router** - Routing
- **Lucide React** - Icons
- **PWA** - Offline support & installability

## 📝 Dalszy rozwój

Aplikacja jest szkieletem gotowym do rozbudowy o:
- Szczegółowy tracking treningów (serie, powtórzenia, ciężar)
- Wykresy progresu i statystyki
- Zdjęcia i notatki do ćwiczeń
- Timery i stopery treningowe
- Export/import danych
- Synchronizacja z cloud (Supabase/Firebase)
- Integracja z wearables

## 📄 Licencja

MIT

## 🤝 Wkład w projekt

Pull requesty są mile widziane! Dla większych zmian, proszę najpierw otwórz issue.
