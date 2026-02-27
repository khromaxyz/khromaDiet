import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ScriptableContext,
} from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import type { ProjectionChartProps } from '../../lib/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const safeBounds = (values: number[]): { min: number; max: number } => {
  const finiteValues = values.filter((value) => Number.isFinite(value));
  if (finiteValues.length === 0) {
    return { min: 0, max: 10 };
  }

  const min = Math.min(...finiteValues);
  const max = Math.max(...finiteValues);
  const padding = Math.max((max - min) * 0.15, 1);
  return {
    min: Math.floor(min - padding),
    max: Math.ceil(max + padding),
  };
};

const normalizeSeries = (values: number[], fallback: number): number[] => {
  let last = Number.isFinite(fallback) ? fallback : 0;
  return values.map((value) => {
    if (Number.isFinite(value)) {
      last = value;
      return value;
    }
    return last;
  });
};

export const ProjectionChart = ({ data, theme = 'dark' }: ProjectionChartProps) => {
  const isLight = theme === 'light';

  const sanitized = useMemo(() => {
    const length = Math.min(data.labels.length, data.weight.length, data.bodyFat.length);
    const labels = data.labels.slice(0, length);
    const weight = normalizeSeries(data.weight.slice(0, length), data.weight[0] ?? 0);
    const bodyFat = normalizeSeries(data.bodyFat.slice(0, length), data.bodyFat[0] ?? 18);
    const refeedWeeks = data.refeedWeeks.filter((index) => index >= 0 && index < length);

    return {
      labels,
      weight,
      bodyFat,
      refeedWeeks,
      bodyFatEstimated: data.bodyFatEstimated,
    };
  }, [data]);

  const chartData = useMemo(() => {
    return {
      labels: sanitized.labels,
      datasets: [
        {
          label: 'Peso (kg)',
          data: sanitized.weight,
          borderColor: '#ff2b2b',
          borderWidth: 2.8,
          fill: true,
          tension: 0.45,
          yAxisID: 'y',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return 'rgba(255,59,59,0.24)';
            }
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(255,59,59,0.34)');
            gradient.addColorStop(1, 'rgba(255,59,59,0)');
            return gradient;
          },
          pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? '#22d3ee' : '#ff2b2b',
          pointBorderColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? 'rgba(34,211,238,0.28)' : 'rgba(255,43,43,0.28)',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 9,
        },
        {
          label: '% BF',
          data: sanitized.bodyFat,
          borderColor: '#8b5cf6',
          borderWidth: 2,
          borderDash: [6, 4],
          fill: false,
          tension: 0.45,
          yAxisID: 'y1',
          pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? '#22d3ee' : '#8b5cf6',
          pointBorderColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? 'rgba(34,211,238,0.25)' : 'rgba(139,92,246,0.25)',
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 9,
        },
      ],
    };
  }, [sanitized]);

  const weightBounds = safeBounds(sanitized.weight);
  const bodyFatBounds = safeBounds(sanitized.bodyFat);

  const tooltipBg = isLight ? 'rgba(255,255,255,0.98)' : 'rgba(14,8,10,0.95)';
  const tooltipTitle = isLight ? 'rgba(24,24,30,0.92)' : 'rgba(240,240,248,0.9)';
  const tooltipText = isLight ? 'rgba(36,36,44,0.84)' : 'rgba(240,240,248,0.6)';
  const tooltipBorder = isLight ? 'rgba(255,43,43,0.32)' : 'rgba(255,43,43,0.24)';
  const gridColor = isLight ? 'rgba(24,24,30,0.08)' : 'rgba(255,255,255,0.04)';
  const xTickColor = isLight ? 'rgba(28,28,36,0.62)' : 'rgba(240,240,248,0.3)';

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1200, easing: 'easeInOutQuart' },
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: tooltipBg,
            titleColor: tooltipTitle,
            bodyColor: tooltipText,
            borderColor: tooltipBorder,
            borderWidth: 1,
            padding: 14,
            cornerRadius: 10,
            callbacks: {
              title: (items) => items[0]?.label ?? '',
              label: (item) =>
                item.datasetIndex === 0
                  ? `  Peso: ${Number(item.raw).toFixed(1)} kg`
                  : `  BF%: ${Number(item.raw).toFixed(1)}%`,
              afterBody: (items) => {
                const lines: string[] = [];
                const index = items[0]?.dataIndex;
                if (index !== undefined && sanitized.refeedWeeks.includes(index)) {
                  lines.push('', '  Semana de Refeed');
                }
                if (sanitized.bodyFatEstimated) {
                  lines.push('  BF% estimado');
                }
                return lines;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: gridColor, drawTicks: false },
            border: { display: false },
            ticks: {
              color: xTickColor,
              maxRotation: 0,
            },
          },
          y: {
            position: 'left',
            min: weightBounds.min,
            max: weightBounds.max,
            grid: { color: gridColor, drawTicks: false },
            border: { display: false },
            ticks: { color: '#ff2b2b', callback: (val) => `${Number(val).toFixed(1)}kg` },
          },
          y1: {
            position: 'right',
            min: bodyFatBounds.min,
            max: bodyFatBounds.max,
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#8b5cf6', callback: (val) => `${Number(val).toFixed(1)}%` },
          },
        },
      }}
    />
  );
};
