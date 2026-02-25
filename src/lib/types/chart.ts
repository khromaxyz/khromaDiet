export interface ProjectionSeries {
  labels: string[];
  weight: number[];
  bodyFat: number[];
  refeedWeeks: number[];
}

export interface ProjectionChartProps {
  data: ProjectionSeries;
}

