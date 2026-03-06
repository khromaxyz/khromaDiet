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

  const weightBounds = safeBounds(sanitized.weight);
  const bodyFatBounds = safeBounds(sanitized.bodyFat);

  const chartData = useMemo(() => {
    return {
      labels: sanitized.labels,
      datasets: [
        {
          label: 'Peso (kg)',
          data: sanitized.weight,
          borderColor: '#10b981',
          borderWidth: 2.8,
          fill: true,
          tension: 0.45,
          yAxisID: 'y',
          backgroundColor: (context: ScriptableContext<'line'>) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) {
              return 'rgba(16,185,129,0.24)';
            }
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(16,185,129,0.28)');
            gradient.addColorStop(1, 'rgba(16,185,129,0)');
            return gradient;
          },
          pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? '#22d3ee' : '#10b981',
          pointBorderColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? 'rgba(34,211,238,0.3)' : 'rgba(16,185,129,0.3)',
          pointBorderWidth: 2.6,
          pointRadius: 5,
          pointHoverRadius: 6,
        },
        {
          label: '% BF',
          data: sanitized.bodyFat,
          borderColor: '#ff6b00',
          borderWidth: 2.1,
          borderDash: [6, 4],
          fill: false,
          tension: 0.45,
          yAxisID: 'y1',
          pointBackgroundColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? '#22d3ee' : '#ff6b00',
          pointBorderColor: (ctx: ScriptableContext<'line'>) =>
            sanitized.refeedWeeks.includes(ctx.dataIndex) ? 'rgba(34,211,238,0.25)' : 'rgba(255,107,0,0.24)',
          pointBorderWidth: 2.2,
          pointRadius: 4,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [sanitized]);

  const tooltipBg = isLight ? 'rgba(255,255,255,0.98)' : 'rgba(14,8,10,0.95)';
  const tooltipTitle = isLight ? 'rgba(24,24,30,0.92)' : 'rgba(240,240,248,0.9)';
  const tooltipText = isLight ? 'rgba(36,36,44,0.84)' : 'rgba(240,240,248,0.6)';
  const tooltipBorder = isLight ? 'rgba(16,185,129,0.32)' : 'rgba(16,185,129,0.24)';
  const gridColor = isLight ? 'rgba(24,24,30,0.08)' : 'rgba(255,255,255,0.04)';
  const xTickColor = isLight ? 'rgba(28,28,36,0.62)' : 'rgba(240,240,248,0.3)';

  const overlay = useMemo(() => {
    const width = 960;
    const height = 260;
    const padL = 60;
    const padR = 40;
    const padT = 20;
    const padB = 40;
    const chartW = width - padL - padR;
    const chartH = height - padT - padB;
    const total = Math.max(1, sanitized.labels.length - 1);

    const xPos = (index: number) => padL + (index / total) * chartW;
    const yWeight = (value: number) =>
      padT + (1 - (value - weightBounds.min) / Math.max(1, weightBounds.max - weightBounds.min)) * chartH;

    const weightPath = sanitized.weight
      .map((value, index) => `${index === 0 ? 'M' : 'L'}${xPos(index)},${yWeight(value)}`)
      .join(' ');

    const areaPath =
      sanitized.weight
        .map((value, index) => `${index === 0 ? 'M' : 'L'}${xPos(index)},${yWeight(value)}`)
        .join(' ') + ` L${xPos(total)},${padT + chartH} L${xPos(0)},${padT + chartH} Z`;

    const milestoneIndexes = sanitized.weight
      .map((_, index) => index)
      .filter((index) => index > 0 && (index % 4 === 0 || index === sanitized.weight.length - 1));

    const yGridValues = Array.from({ length: 5 }).map((_, index) => {
      const pct = index / 4;
      return Math.round((weightBounds.max - (weightBounds.max - weightBounds.min) * pct) * 10) / 10;
    });

    const xGridIndexes = sanitized.labels
      .map((_, index) => index)
      .filter((index) => index === 0 || index === sanitized.labels.length - 1 || index % 2 === 0);

    return {
      width,
      height,
      padL,
      padR,
      padT,
      padB,
      chartW,
      chartH,
      xPos,
      yWeight,
      weightPath,
      areaPath,
      milestoneIndexes,
      yGridValues,
      xGridIndexes,
    };
  }, [sanitized.labels, sanitized.weight, weightBounds.max, weightBounds.min]);

  return (
    <div className="projection-chart-hybrid">
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
              ticks: { color: '#10b981', callback: (val) => `${Number(val).toFixed(1)}kg` },
            },
            y1: {
              position: 'right',
              min: bodyFatBounds.min,
              max: bodyFatBounds.max,
              grid: { display: false },
              border: { display: false },
              ticks: { color: '#ff6b00', callback: (val) => `${Number(val).toFixed(1)}%` },
            },
          },
        }}
      />

      <svg className="projection-chart-overlay" viewBox={`0 0 ${overlay.width} ${overlay.height}`} aria-hidden>
        <defs>
          <linearGradient id="overlayWeightArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {overlay.yGridValues.map((value) => (
          <line
            key={`y-grid-${value}`}
            x1={overlay.padL}
            y1={overlay.yWeight(value)}
            x2={overlay.width - overlay.padR}
            y2={overlay.yWeight(value)}
            className="chart-grid-line"
          />
        ))}

        <line x1={overlay.padL} y1={overlay.padT} x2={overlay.padL} y2={overlay.padT + overlay.chartH} className="chart-grid-line" />
        <line
          x1={overlay.padL}
          y1={overlay.padT + overlay.chartH}
          x2={overlay.width - overlay.padR}
          y2={overlay.padT + overlay.chartH}
          className="chart-grid-line"
        />

        {overlay.yGridValues.map((value) => (
          <text key={`y-label-${value}`} x={overlay.padL - 10} y={overlay.yWeight(value) + 4} className="chart-axis-label" textAnchor="end">
            {value.toFixed(0)}
          </text>
        ))}

        {overlay.xGridIndexes.map((index) => (
          <text
            key={`x-label-${sanitized.labels[index]}`}
            x={overlay.xPos(index)}
            y={overlay.height - 8}
            className="chart-axis-label"
            textAnchor="middle"
          >
            {sanitized.labels[index]?.replace('Sem ', 'S')}
          </text>
        ))}

        <path d={overlay.areaPath} fill="url(#overlayWeightArea)" opacity="0.9" />
        <path d={overlay.weightPath} stroke="#10b981" strokeWidth="1.8" fill="none" opacity="0.65" />

        {overlay.milestoneIndexes.map((index) => {
          const x = overlay.xPos(index);
          const y = overlay.yWeight(sanitized.weight[index] ?? 0);
          return (
            <g key={`milestone-${index}`}>
              <circle cx={x} cy={y} r="4.5" className="milestone-circle" stroke="#10b981" />
              <text x={x} y={y - 10} textAnchor="middle" className="milestone-label">
                S{index}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
/* @deprecated Legacy Chart.js projection chart retained temporarily for non-presentation cleanup. */
