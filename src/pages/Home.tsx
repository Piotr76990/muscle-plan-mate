import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { Flame, Calendar, TrendingUp, Weight } from 'lucide-react';

const Home = () => {
  const mainCards = [
    {
      title: 'Mapa mięśni',
      description: 'Przeglądaj ćwiczenia według grup mięśniowych',
      icon: Flame,
      to: '/muscle-map',
      gradient: true,
    },
    {
      title: 'Plan treningowy',
      description: 'Planuj i zarządzaj swoimi treningami',
      icon: Calendar,
      to: '/plan',
    },
    {
      title: 'Historia i progres',
      description: 'Śledź swoje osiągnięcia i postępy',
      icon: TrendingUp,
      to: '/history',
    },
    {
      title: 'Tracker wagi',
      description: 'Monitoruj swoją wagę i kompozycję ciała',
      icon: Weight,
      to: '/weight',
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Witaj w FitTracker
            </h2>
            <p className="text-muted-foreground">
              Twój osobisty asystent treningowy
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mainCards.map((card) => (
              <Card key={card.to} {...card} />
            ))}
          </div>

          <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">💡 Szybki start</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Zacznij od przeglądu mapy mięśni i wyboru ćwiczeń</li>
              <li>• Stwórz swój pierwszy plan treningowy</li>
              <li>• Zapisuj wykonane treningi w historii</li>
              <li>• Śledź swoją wagę i postępy</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
