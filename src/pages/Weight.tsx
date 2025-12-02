import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BackButton } from '@/components/BackButton';
import { WeightModal } from '@/components/WeightModal';
import { WeightChart } from '@/components/WeightChart';
import { Button } from '@/components/ui/button';
import { 
  getAllWeights, 
  saveWeight, 
  updateWeight, 
  deleteWeight, 
  exportWeightsCSV,
  WeightEntry 
} from '@/utils/storage';
import { Plus, Download, Trash2, Edit, TrendingDown, TrendingUp, Scale } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Weight = () => {
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWeight, setEditingWeight] = useState<WeightEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadWeights();
  }, []);

  const loadWeights = () => {
    const data = getAllWeights();
    setWeights(data);
  };

  const handleSave = (weightData: { date: string; weightKg: number; note?: string }) => {
    if (editingWeight) {
      updateWeight(editingWeight.id, weightData);
      toast({ description: 'Pomiar zaktualizowany' });
      setEditingWeight(null);
    } else {
      saveWeight(weightData);
      toast({ description: 'Pomiar zapisany' });
    }
    loadWeights();
  };

  const handleEdit = (weight: WeightEntry) => {
    setEditingWeight(weight);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteWeight(deleteId);
      toast({ description: 'Pomiar usunięty' });
      setDeleteId(null);
      loadWeights();
    }
  };

  const handleExport = () => {
    const csv = exportWeightsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `weight_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast({ description: 'Eksport CSV zakończony' });
  };

  const getStats = () => {
    if (weights.length === 0) {
      return { lastWeight: null, change: null, changePercent: null, avg7days: null };
    }

    const sortedByDate = [...weights].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const lastWeight = sortedByDate[0].weightKg;
    const prevWeight = sortedByDate[1]?.weightKg;
    const change = prevWeight ? lastWeight - prevWeight : null;
    const changePercent = prevWeight ? ((change! / prevWeight) * 100) : null;

    // Average last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const last7Days = weights.filter(w => new Date(w.date) >= sevenDaysAgo);
    const avg7days = last7Days.length > 0 
      ? last7Days.reduce((sum, w) => sum + w.weightKg, 0) / last7Days.length 
      : null;

    return { lastWeight, change, changePercent, avg7days };
  };

  const stats = getStats();
  const hasData = weights.length > 0;

  // Sort for display (newest first)
  const displayWeights = [...weights].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="Tracker wagi" />
      
      <div className="container mx-auto px-4 pt-4">
        <BackButton />
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-foreground">Tracker wagi</h2>
            {hasData && (
              <Button
                onClick={handleExport}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
            )}
          </div>

          {!hasData ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Rozpocznij śledzenie wagi
              </h3>
              <p className="text-muted-foreground mb-6">
                Dodaj swój pierwszy pomiar, aby zacząć monitorować postępy
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Dodaj pomiar
              </Button>
            </div>
          ) : (
            <>
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Ostatnia waga</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.lastWeight?.toFixed(1)} kg
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {stats.change !== null && stats.change < 0 ? (
                      <TrendingDown className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                    )}
                    <span className="text-sm text-muted-foreground">Zmiana</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.change !== null 
                      ? `${stats.change > 0 ? '+' : ''}${stats.change.toFixed(1)} kg`
                      : '—'}
                  </p>
                  {stats.changePercent !== null && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.changePercent > 0 ? '+' : ''}{stats.changePercent.toFixed(1)}%
                    </p>
                  )}
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Średnia 7 dni</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.avg7days !== null ? `${stats.avg7days.toFixed(1)} kg` : '—'}
                  </p>
                </div>
              </div>

              {/* Chart and list layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Wykres wagi</h3>
                  <WeightChart weights={weights} />
                </div>

                {/* List */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Historia pomiarów</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {displayWeights.map((weight) => (
                      <div 
                        key={weight.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">
                            {weight.weightKg.toFixed(1)} kg
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(weight.date).toLocaleDateString('pl-PL', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          {weight.note && (
                            <p className="text-xs text-muted-foreground italic mt-1">
                              {weight.note}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(weight)}
                            aria-label="Edytuj pomiar"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(weight.id)}
                            aria-label="Usuń pomiar"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modal */}
      <WeightModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingWeight(null);
        }}
        onSave={handleSave}
        editWeight={editingWeight}
      />

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usuń pomiar</AlertDialogTitle>
            <AlertDialogDescription>
              Na pewno usunąć ten pomiar? Ta operacja jest nieodwracalna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Usuń</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Weight;
