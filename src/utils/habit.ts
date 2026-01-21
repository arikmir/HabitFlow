import {
  Habit,
  HabitCompletion,
  HabitStreak,
  DailyHabitStatus,
  HabitWithStats,
  DayOfWeek,
  CreateHabitInput,
} from '@/types';
import { generateId } from './id';
import { getDayOfWeek, isToday, isSameDay, daysBetween, getStartOfDay } from './date';

/**
 * Check if a habit should be tracked on a given day
 */
export const shouldTrackHabitOnDay = (habit: Habit, date: Date = new Date()): boolean => {
  if (habit.archivedAt) return false;

  switch (habit.frequency) {
    case 'daily':
      return true;
    case 'weekly':
    case 'custom':
      const dayOfWeek = getDayOfWeek(date);
      return habit.targetDays?.includes(dayOfWeek) ?? false;
    default:
      return false;
  }
};

/**
 * Check if a habit is completed on a given day
 */
export const isHabitCompletedOnDay = (
  habitId: string,
  completions: HabitCompletion[],
  date: Date = new Date()
): boolean => {
  return completions.some(
    completion => completion.habitId === habitId && isSameDay(new Date(completion.completedAt), date)
  );
};

/**
 * Get completion for a habit on a specific day
 */
export const getCompletionForDay = (
  habitId: string,
  completions: HabitCompletion[],
  date: Date = new Date()
): HabitCompletion | undefined => {
  return completions.find(
    completion => completion.habitId === habitId && isSameDay(new Date(completion.completedAt), date)
  );
};

/**
 * Calculate streak for a habit
 */
export const calculateStreak = (
  habit: Habit,
  completions: HabitCompletion[]
): HabitStreak => {
  const habitCompletions = completions
    .filter(c => c.habitId === habit.id)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  if (habitCompletions.length === 0) {
    return {
      habitId: habit.id,
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: Date | null = null;
  let streakStartDate: Date | undefined;

  // Sort completions by date ascending for streak calculation
  const sortedCompletions = [...habitCompletions].sort(
    (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
  );

  for (const completion of sortedCompletions) {
    const completionDate = getStartOfDay(new Date(completion.completedAt));

    if (lastDate === null) {
      tempStreak = 1;
      streakStartDate = completionDate;
    } else {
      const daysDiff = daysBetween(lastDate, completionDate);

      if (daysDiff === 1) {
        tempStreak++;
      } else if (daysDiff > 1) {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        tempStreak = 1;
        streakStartDate = completionDate;
      }
      // daysDiff === 0 means same day, don't increment
    }

    lastDate = completionDate;
  }

  // Check if the streak is still active (completed today or yesterday)
  if (lastDate) {
    const today = getStartOfDay(new Date());
    const daysSinceLastCompletion = daysBetween(lastDate, today);

    if (daysSinceLastCompletion <= 1) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0;
    }
  }

  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }

  return {
    habitId: habit.id,
    currentStreak,
    longestStreak,
    lastCompletedAt: habitCompletions[0]?.completedAt
      ? new Date(habitCompletions[0].completedAt)
      : undefined,
    streakStartDate,
  };
};

/**
 * Get daily status for a list of habits
 */
export const getDailyHabitStatuses = (
  habits: Habit[],
  completions: HabitCompletion[],
  date: Date = new Date()
): DailyHabitStatus[] => {
  return habits
    .filter(habit => shouldTrackHabitOnDay(habit, date))
    .map(habit => {
      const completion = getCompletionForDay(habit.id, completions, date);
      const streak = calculateStreak(habit, completions);

      return {
        habit,
        isCompleted: !!completion,
        completionId: completion?.id,
        streak: streak.currentStreak,
        isStreakAtRisk: !completion && streak.currentStreak > 0 && isToday(date),
      };
    });
};

/**
 * Enhance habits with statistics
 */
export const getHabitsWithStats = (
  habits: Habit[],
  completions: HabitCompletion[]
): HabitWithStats[] => {
  return habits.map(habit => {
    const habitCompletions = completions.filter(c => c.habitId === habit.id);
    const streak = calculateStreak(habit, completions);
    const completedToday = isHabitCompletedOnDay(habit.id, completions);

    // Calculate completion rate (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let possibleDays = 0;
    let completedDays = 0;

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      if (shouldTrackHabitOnDay(habit, date)) {
        possibleDays++;
        if (isHabitCompletedOnDay(habit.id, habitCompletions, date)) {
          completedDays++;
        }
      }
    }

    const completionRate = possibleDays > 0 ? Math.round((completedDays / possibleDays) * 100) : 0;

    return {
      ...habit,
      streak,
      completedToday,
      completionRate,
      totalCompletions: habitCompletions.length,
    };
  });
};

/**
 * Create a new habit from input
 */
export const createHabitFromInput = (input: CreateHabitInput): Habit => {
  const now = new Date();
  return {
    id: generateId(),
    ...input,
    reminderEnabled: input.reminderEnabled ?? false,
    createdAt: now,
    updatedAt: now,
    order: Date.now(), // Use timestamp for default ordering
  };
};

/**
 * Create a new completion record
 */
export const createCompletion = (
  habitId: string,
  note?: string,
  value?: number
): HabitCompletion => {
  return {
    id: generateId(),
    habitId,
    completedAt: new Date(),
    note,
    value,
  };
};

/**
 * Get habits that need reminders
 */
export const getHabitsNeedingReminder = (
  habits: Habit[],
  currentTime: string // HH:mm format
): Habit[] => {
  return habits.filter(
    habit =>
      habit.reminderEnabled &&
      habit.reminderTime === currentTime &&
      shouldTrackHabitOnDay(habit) &&
      !habit.archivedAt
  );
};
