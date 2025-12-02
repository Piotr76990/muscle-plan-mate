import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeightEntry } from '@/utils/storage';

interface WeightChartProps {
  weights: WeightEntry[];
}

export const WeightChart = ({ weights }: WeightChartProps) => {
  if (weights.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        Brak danych do wyświetlenia
      </div>
    );
  }

  // Prepare chart data
  const chartData = weights.map(w => ({
    date: new Date(w.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }),
    fullDate: new Date(w.date).toLocaleDateString('pl-PL', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    weight: w.weightKg,
    note: w.note,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground">{data.weight.toFixed(1)} kg</p>
          <p className="text-xs text-muted-foreground mt-1">{data.fullDate}</p>
          {data.note && (
            <p className="text-xs text-muted-foreground mt-1 italic">"{data.note}"</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Calculate nice Y-axis domain
  const weights_values = chartData.map(d => d.weight);
  const minWeight = Math.min(...weights_values);
  const maxWeight = Math.max(...weights_values);
  const padding = (maxWeight - minWeight) * 0.1 || 2;
  const yMin = Math.floor(minWeight - padding);
  const yMax = Math.ceil(maxWeight + padding);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis 
          dataKey="date" 
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
        />
        <YAxis 
          domain={[yMin, yMax]}
          stroke="hsl(var(--muted-foreground))"
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
          tickLine={{ stroke: 'hsl(var(--border))' }}
          label={{ 
            value: 'kg', 
            angle: -90, 
            position: 'insideLeft',
            style: { fill: 'hsl(var(--muted-foreground))' }
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="weight" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          animationDuration={500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
