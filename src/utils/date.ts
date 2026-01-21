import { DayOfWeek, DAYS_OF_WEEK } from '@/types';

/**
 * Get the start of today (midnight)
 */
export const getStartOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get the end of day (23:59:59.999)
 */
export const getEndOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Get the day of week for a date
 */
export const getDayOfWeek = (date: Date = new Date()): DayOfWeek => {
  const dayIndex = date.getDay();
  // JavaScript: 0 = Sunday, we want 0 = Monday
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return DAYS_OF_WEEK[adjustedIndex];
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Check if a date is yesterday
 */
export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

/**
 * Get the start of the week (Monday)
 */
export const getStartOfWeek = (date: Date = new Date()): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get the start of the month
 */
export const getStartOfMonth = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Get the number of days between two dates
 */
export const daysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000;
  const start = getStartOfDay(date1);
  const end = getStartOfDay(date2);
  return Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
};

/**
 * Format a date as YYYY-MM-DD
 */
export const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Parse a YYYY-MM-DD string to a Date
 */
export const parseDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Get an array of dates for the current week
 */
export const getWeekDates = (startDate: Date = new Date()): Date[] => {
  const start = getStartOfWeek(startDate);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

/**
 * Get an array of dates for the current month
 */
export const getMonthDates = (date: Date = new Date()): Date[] => {
  const start = getStartOfMonth(date);
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => addDays(start, i));
};

/**
 * Format time from HH:mm string to display format
 */
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
};

/**
 * Get relative date string (Today, Yesterday, or formatted date)
 */
export const getRelativeDateString = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};
