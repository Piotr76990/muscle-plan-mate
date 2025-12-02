import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { WeightEntry } from '@/utils/storage';

interface WeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (weight: { date: string; weightKg: number; note?: string }) => void;
  editWeight?: WeightEntry | null;
}

export const WeightModal = ({ isOpen, onClose, onSave, editWeight }: WeightModalProps) => {
  const [date, setDate] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editWeight) {
        // Edit mode
        const localDate = new Date(editWeight.date);
        const offset = localDate.getTimezoneOffset();
        const adjustedDate = new Date(localDate.getTime() - offset * 60 * 1000);
        setDate(adjustedDate.toISOString().slice(0, 16));
        setWeightKg(editWeight.weightKg.toString());
        setNote(editWeight.note || '');
      } else {
        // Add mode - default to now
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localNow = new Date(now.getTime() - offset * 60 * 1000);
        setDate(localNow.toISOString().slice(0, 16));
        setWeightKg('');
        setNote('');
      }
      setError('');
    }
  }, [isOpen, editWeight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weight = parseFloat(weightKg);
    if (isNaN(weight) || weight <= 20 || weight >= 500) {
      setError('Waga musi być liczbą między 20 a 500 kg');
      return;
    }

    if (!date) {
      setError('Data jest wymagana');
      return;
    }

    onSave({
      date: new Date(date).toISOString(),
      weightKg: weight,
      note: note.trim() || undefined,
    });
    
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editWeight ? 'Edytuj pomiar' : 'Dodaj pomiar wagi'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="date">Data i czas</Label>
          <Input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="weight">Waga (kg)</Label>
          <Input
            id="weight"
            type="number"
            step="0.1"
            min="20"
            max="500"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="np. 76.5"
            required
            className="mt-1"
            aria-label="Waga w kilogramach"
          />
        </div>

        <div>
          <Label htmlFor="note">Notatka (opcjonalnie)</Label>
          <Textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="np. przed śniadaniem"
            className="mt-1"
            rows={2}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Anuluj
          </Button>
          <Button type="submit" className="flex-1">
            Zapisz
          </Button>
        </div>
      </form>
    </Modal>
  );
};
