import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

const History = () => {
  // Mock data for completed workouts
  const recentWorkouts = [
    { id: 1, date: '2025-11-16', title: 'Trening klatki', exercises: 5, duration: '45 min' },
    { id: 2, date: '2025-11-14', title: 'Trening pleców', exercises: 6, duration: '50 min' },
    { id: 3, date: '2025-11-12', title: 'Trening nóg', exercises: 4, duration: '55 min' },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Historia i progres" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Ten tydzień</span>
              </div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-muted-foreground">treningi</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">Seria</span>
              </div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">dni z rzędu</p>
            </div>
          </div>

          {/* Recent workouts */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Ostatnie treningi</h2>
            
            {recentWorkouts.length === 0 ? (
              <div className="text-center py-12 bg-muted/50 rounded-lg border border-border">
                <p className="text-muted-foreground">
                  Brak zapisanych treningów. Rozpocznij swój pierwszy trening!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-smooth cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{workout.title}</h3>
                      <span className="text-xs text-muted-foreground">{workout.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{workout.exercises} ćwiczeń</span>
                      <span>•</span>
                      <span>{workout.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">🎯 Twoje cele</h3>
            <p className="text-sm text-muted-foreground">
              Funkcja wykresów i szczegółowej analizy progresu będzie dostępna wkrótce!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
