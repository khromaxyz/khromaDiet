export interface ProjectionSeries {
  labels: string[];
  weight: number[];
  bodyFat: number[];
  refeedWeeks: number[];
  bodyFatEstimated?: boolean;
}

export interface ProjectionChartProps {
  data: ProjectionSeries;
  theme?: 'dark' | 'light';
}
