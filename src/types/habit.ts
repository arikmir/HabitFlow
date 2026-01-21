// ============================================
// Core Enums and Types
// ============================================

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAYS_OF_WEEK: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export const DAY_SHORT_LABELS: Record<DayOfWeek, string> = {
  mon: 'M',
  tue: 'T',
  wed: 'W',
  thu: 'T',
  fri: 'F',
  sat: 'S',
  sun: 'S',
};

// ============================================
// Core Models
// ============================================

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  targetDays?: DayOfWeek[]; // For weekly/custom frequency
  targetCount?: number; // e.g., 3 times per week
  reminderTime?: string; // HH:mm format
  reminderEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
  categoryId?: string;
  order: number; // For custom sorting
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  completedAt: Date;
  note?: string;
  value?: number; // For quantifiable habits (e.g., glasses of water)
}

export interface HabitStreak {
  habitId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedAt?: Date;
  streakStartDate?: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  order: number;
}

// ============================================
// Computed/Display Types (for UI)
// ============================================

export interface HabitWithStats extends Habit {
  streak: HabitStreak;
  completedToday: boolean;
  completionRate: number; // 0-100
  totalCompletions: number;
}

export interface DailyHabitStatus {
  habit: Habit;
  isCompleted: boolean;
  completionId?: string;
  streak: number;
  isStreakAtRisk: boolean; // True if not completed and streak > 0
}

export interface HabitStatistics {
  habitId: string;
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number; // Percentage
  averageCompletionsPerWeek: number;
  bestDay: DayOfWeek | null;
  bestTime: string | null; // HH:mm format
  weeklyCompletions: number[];
  monthlyCompletions: Record<string, number>; // 'YYYY-MM-DD' -> count
}

// ============================================
// Form Types
// ============================================

export interface CreateHabitInput {
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: HabitFrequency;
  targetDays?: DayOfWeek[];
  targetCount?: number;
  reminderTime?: string;
  reminderEnabled: boolean;
  categoryId?: string;
}

export interface UpdateHabitInput extends Partial<CreateHabitInput> {
  id: string;
}

export interface CreateCategoryInput {
  name: string;
  color: string;
  icon: string;
}

// ============================================
// Filter & Sort Types
// ============================================

export type HabitSortField = 'name' | 'createdAt' | 'streak' | 'completionRate' | 'order';
export type SortDirection = 'asc' | 'desc';

export interface HabitFilters {
  categoryId?: string;
  frequency?: HabitFrequency;
  showArchived?: boolean;
  searchQuery?: string;
}

export interface HabitSort {
  field: HabitSortField;
  direction: SortDirection;
}

// ============================================
// Calendar & Analytics Types
// ============================================

export interface CalendarDay {
  date: Date;
  completedHabits: string[]; // habit IDs
  totalHabits: number;
  completionRate: number;
}

export interface WeekSummary {
  startDate: Date;
  endDate: Date;
  totalCompletions: number;
  totalPossible: number;
  completionRate: number;
  habitBreakdown: Record<string, number>; // habitId -> completions
}

export interface HabitCorrelation {
  habitId1: string;
  habitId2: string;
  correlationScore: number; // -1 to 1
  sampleSize: number;
}

// ============================================
// Notification Types
// ============================================

export interface HabitReminder {
  habitId: string;
  habitName: string;
  scheduledTime: Date;
  notificationId: string;
}

export interface StreakAlert {
  habitId: string;
  habitName: string;
  currentStreak: number;
  message: string;
}
