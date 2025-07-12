import type { GlucoseEntry } from '@/lib/types';

export const initialEntries: GlucoseEntry[] = [
  {
    id: '1',
    date: new Date('2024-07-15T08:00:00'),
    time: '08:00',
    mealType: 'breakfast',
    glycemia: 1.10,
    novorapidDosage: 8,
  },
  
];
