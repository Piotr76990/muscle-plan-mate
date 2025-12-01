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
        <div className="max-w-[560px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Witaj w GymTracker
            </h2>
            <p className="text-muted-foreground">
              Twój osobisty asystent treningowy
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {mainCards.map((card) => (
              <Card key={card.to} {...card} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
