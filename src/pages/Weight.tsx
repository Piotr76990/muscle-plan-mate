import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { Weight as WeightIcon, Plus } from 'lucide-react';

const Weight = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Tracker wagi" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <WeightIcon className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Rozpocznij śledzenie wagi
            </h2>
            <p className="text-muted-foreground mb-6">
              Dodaj swój pierwszy pomiar, aby zacząć monitorować postępy
            </p>
            <button className="flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-smooth mx-auto">
              <Plus className="w-5 h-5" />
              Dodaj pomiar
            </button>
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-3">📊 Co będziesz mógł śledzić?</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Historia pomiarów wagi</li>
              <li>• Wykresy zmian w czasie</li>
              <li>• Cel wagowy i postęp</li>
              <li>• Średnia tygodniowa zmiana</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Weight;
