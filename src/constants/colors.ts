export const Colors = {
  light: {
    primary: '#6366F1',
    primaryLight: '#818CF8',
    secondary: '#EC4899',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    streak: '#F97316',
  },
  dark: {
    primary: '#818CF8',
    primaryLight: '#A5B4FC',
    secondary: '#F472B6',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    streak: '#FB923C',
  },
};

export type ThemeColors = typeof Colors.light;
