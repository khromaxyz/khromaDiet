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

const xLabels = ['0', '1', '2', '3', '4?', '5', '6', '7', '8?', '9', '10', '11', '12?'];

export const ProjectionChart = ({ data }: ProjectionChartProps) => {
  const chartData = useMemo(() => {
    return {
      labels: data.labels,
      datasets: [
        {
          label: 'Peso (kg)',
          data: data.weight,
          borderColor: '#c8ff00',
          borderWidth: 2.5,
          fill: true,
          tension: 0.45,
          yAxisID: 'y',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return 'rgba(200,255,0,0.18)';
            }
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(200,255,0,0.18)');
            gradient.addColorStop(1, 'rgba(200,255,0,0)');
            return gradient;
          },
          pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
            data.refeedWeeks.includes(ctx.dataIndex) ? '#fb923c' : '#c8ff00',
          pointBorderColor: (ctx: ScriptableContext<'line'>) =>
            data.refeedWeeks.includes(ctx.dataIndex) ? '#fb923c' : '#c8ff00',
          pointRadius: (ctx: ScriptableContext<'line'>) =>
            data.refeedWeeks.includes(ctx.dataIndex) ? 7 : 4,
          pointHoverRadius: 8,
        },
        {
          label: '% BF',
          data: data.bodyFat,
          borderColor: '#8b5cf6',
          borderWidth: 2,
          borderDash: [6, 4],
          fill: false,
          tension: 0.45,
          yAxisID: 'y1',
          pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
            data.refeedWeeks.includes(ctx.dataIndex) ? '#fb923c' : '#8b5cf6',
          pointBorderColor: (ctx: ScriptableContext<'line'>) =>
            data.refeedWeeks.includes(ctx.dataIndex) ? '#fb923c' : '#8b5cf6',
          pointRadius: (ctx: ScriptableContext<'line'>) =>
            data.refeedWeeks.includes(ctx.dataIndex) ? 7 : 4,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [data]);

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1800, easing: 'easeInOutQuart' },
        interaction: { intersect: false, mode: 'index' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(13,13,26,0.95)',
            titleColor: 'rgba(240,240,248,0.9)',
            bodyColor: 'rgba(240,240,248,0.6)',
            borderColor: 'rgba(255,255,255,0.12)',
            borderWidth: 1,
            padding: 14,
            cornerRadius: 10,
            callbacks: {
              title: (items) => items[0]?.label.replace('\n', ' ') ?? '',
              label: (item) =>
                item.datasetIndex === 0
                  ? `  Peso: ${Number(item.raw).toFixed(1)} kg`
                  : `  BF%: ${Number(item.raw).toFixed(1)}%`,
              afterBody: (items) => {
                const index = items[0]?.dataIndex;
                if (index !== undefined && data.refeedWeeks.includes(index)) {
                  return ['', '  ? Semana de Refeed'];
                }
                return [];
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false },
            border: { display: false },
            ticks: {
              color: 'rgba(240,240,248,0.3)',
              maxRotation: 0,
              callback: (_, idx) => `S${xLabels[idx] ?? idx}`,
            },
          },
          y: {
            position: 'left',
            min: 74,
            max: 81,
            grid: { color: 'rgba(255,255,255,0.04)', drawTicks: false },
            border: { display: false },
            ticks: { color: '#c8ff00', callback: (val) => `${Number(val).toFixed(1)}kg` },
          },
          y1: {
            position: 'right',
            min: 12,
            max: 19,
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#8b5cf6', callback: (val) => `${Number(val).toFixed(1)}%` },
          },
        },
      }}
    />
  );
};

