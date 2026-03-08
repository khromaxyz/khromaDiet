import { ResponsiveLine, type PointTooltipProps } from '@nivo/line';
import { useMemo } from 'react';

import { NIVO_THEME } from '@/components/design-system';

export interface ProjectionTrendPoint {
  week: number;
  label: string;
  weightKg: number;
  bodyFatPct: number | null;
  fatLostKg: number;
}

interface ProjectionDatum {
  x: string;
  y: number;
  week: number;
  bodyFatPct: number | null;
  fatLostKg: number;
}

interface ProjectionTrendSeries {
  id: string;
  data: ProjectionDatum[];
}

interface ProjectionTrendChartProps {
  points: ProjectionTrendPoint[];
  targetWeightKg: number;
}

const roundHalf = (value: number, method: 'ceil' | 'floor') => {
  const scaled = value * 2;
  return method === 'ceil' ? Math.ceil(scaled) / 2 : Math.floor(scaled) / 2;
};

const getWeightBounds = (points: ProjectionTrendPoint[], targetWeightKg: number) => {
  const values = points.map((point) => point.weightKg).concat(targetWeightKg);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max((max - min) * 0.16, 1.2);

  return {
    min: roundHalf(min - padding, 'floor'),
    max: roundHalf(max + padding, 'ceil'),
  };
};

const formatMetric = (value: number, digits = 1) =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

const ProjectionTooltip = ({ point }: PointTooltipProps<ProjectionTrendSeries>) => {
  const data = point.data;

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-overlay)] px-3 py-2 shadow-[var(--shadow-lg)]">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[2px] text-[var(--emerald-400)]">
        Semana {data.week}
      </div>
      <div className="mt-1 font-mono text-sm font-semibold text-[var(--text-primary)]">
        {formatMetric(Number(data.y), 1)} kg
      </div>
      {typeof data.bodyFatPct === 'number' ? (
        <div className="mt-1 text-xs text-[var(--text-secondary)]">BF {formatMetric(data.bodyFatPct, 1)}%</div>
      ) : null}
      {data.fatLostKg > 0 ? (
        <div className="mt-1 text-xs text-[var(--text-muted)]">Gordura estimada perdida {formatMetric(data.fatLostKg, 1)} kg</div>
      ) : null}
    </div>
  );
};

export const ProjectionTrendChart = ({ points, targetWeightKg }: ProjectionTrendChartProps) => {
  const lineData = useMemo<ProjectionTrendSeries[]>(
    () => [
      {
        id: 'Peso projetado',
        data: points.map<ProjectionDatum>((point) => ({
          x: point.label,
          y: point.weightKg,
          week: point.week,
          bodyFatPct: point.bodyFatPct,
          fatLostKg: point.fatLostKg,
        })),
      },
    ],
    [points],
  );

  const weightBounds = useMemo(() => getWeightBounds(points, targetWeightKg), [points, targetWeightKg]);
  const tickValues = useMemo(
    () =>
      points
        .filter((point, index) => index === 0 || index === points.length - 1 || point.week % 4 === 0)
        .map((point) => point.label),
    [points],
  );

  return (
    <div className="h-full w-full" data-testid="projection-chart-shell">
      <ResponsiveLine<ProjectionTrendSeries>
        data={lineData}
        theme={NIVO_THEME}
        margin={{ top: 24, right: 54, bottom: 48, left: 58 }}
        defs={[
          {
            id: 'projectionAreaGradient',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: 'var(--emerald-500)', opacity: 0.28 },
              { offset: 75, color: 'var(--emerald-500)', opacity: 0.06 },
              { offset: 100, color: 'var(--emerald-500)', opacity: 0 },
            ],
          },
          {
            id: 'projectionLineGradient',
            type: 'linearGradient',
            colors: [
              { offset: 0, color: 'var(--emerald-600)', opacity: 1 },
              { offset: 50, color: 'var(--emerald-500)', opacity: 1 },
              { offset: 100, color: 'var(--emerald-400)', opacity: 1 },
            ],
          },
        ]}
        fill={[{ match: '*', id: 'projectionAreaGradient' }]}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: weightBounds.min,
          max: weightBounds.max,
          stacked: false,
          reverse: false,
        }}
        curve="monotoneX"
        colors={() => 'url(#projectionLineGradient)'}
        lineWidth={3}
        pointSize={7}
        pointColor="var(--bg-base)"
        pointBorderWidth={2}
        pointBorderColor="var(--emerald-400)"
        enableArea
        areaOpacity={1}
        enableGridX={false}
        useMesh
        enableSlices={false}
        tooltip={ProjectionTooltip}
        markers={[
          {
            axis: 'y',
            value: targetWeightKg,
            lineStyle: {
              stroke: 'var(--text-ghost)',
              strokeWidth: 1,
              strokeDasharray: '6 4',
            },
            legend: 'Meta',
            legendPosition: 'right',
            textStyle: {
              fill: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
            },
          },
        ]}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickValues,
          tickSize: 0,
          tickPadding: 12,
          legend: 'Semanas',
          legendOffset: 38,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 12,
          legend: 'Peso (kg)',
          legendOffset: -44,
          legendPosition: 'middle',
          format: (value) => `${formatMetric(Number(value), 1)} kg`,
        }}
      />
    </div>
  );
};
