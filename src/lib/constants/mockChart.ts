import type { ProjectionSeries } from '../types';

export const projectionSeries: ProjectionSeries = {
  labels: [
    'Sem 0',
    'Sem 1',
    'Sem 2',
    'Sem 3',
    'Sem 4\n? Refeed',
    'Sem 5',
    'Sem 6',
    'Sem 7',
    'Sem 8\n? Refeed',
    'Sem 9',
    'Sem 10',
    'Sem 11',
    'Sem 12\n? Refeed',
  ],
  weight: [80.0, 79.6, 79.1, 78.6, 78.9, 78.5, 78.0, 77.5, 77.8, 77.3, 76.7, 76.1, 75.7],
  bodyFat: [18.0, 17.6, 17.2, 16.8, 16.9, 16.5, 16.1, 15.7, 15.8, 15.3, 14.8, 14.3, 13.8],
  refeedWeeks: [4, 8, 12],
};

