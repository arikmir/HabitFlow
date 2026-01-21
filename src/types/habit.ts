export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  targetDays?: DayOfWeek[]; // For weekly/custom frequency
  targetCount?: number; // e.g., 3 times per week
  createdAt: Date;
  archivedAt?: Date;
  categoryId?: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  completedAt: Date;
  note?: string;
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedAt?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}
