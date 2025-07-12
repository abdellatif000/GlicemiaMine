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
  {
    id: '2',
    date: new Date('2024-07-15T12:30:00'),
    time: '12:30',
    mealType: 'lunch',
    glycemia: 1.45,
    novorapidDosage: 10,
  },
  {
    id: '3',
    date: new Date('2024-07-15T19:00:00'),
    time: '19:00',
    mealType: 'dinner',
    glycemia: 0.95,
    novorapidDosage: 12,
  },
  {
    id: '4',
    date: new Date('2024-07-16T08:15:00'),
    time: '08:15',
    mealType: 'breakfast',
    glycemia: 1.80,
    novorapidDosage: 9,
  },
];
