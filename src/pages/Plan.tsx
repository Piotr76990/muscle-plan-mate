import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { Calendar, Plus } from 'lucide-react';

const Plan = () => {
  const daysOfWeek = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
  ];

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
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-smooth">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Nowy trening</span>
            </button>
          </div>

          <div className="space-y-3">
            {daysOfWeek.map((day, index) => (
              <div
                key={day}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{day}</h3>
                    <p className="text-sm text-muted-foreground">
                      {index % 3 === 0 ? 'Dzień treningowy' : 'Dzień odpoczynku'}
                    </p>
                  </div>
                  {index % 3 === 0 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
                      Zaplanowany
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              💡 Kliknij dzień, aby dodać lub edytować trening
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Plan;
