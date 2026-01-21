import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import { Colors } from '@/constants';
import {
  Habit,
  HabitCompletion,
  DailyHabitStatus,
} from '@/types';
import {
  getDailyHabitStatuses,
  createCompletion,
} from '@/utils/habit';

// Sample data for demo - in a real app, this would come from state/storage
const SAMPLE_HABITS: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: 'Start the day with 10 minutes of mindfulness',
    icon: '🧘',
    color: '#6366F1',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '07:00',
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 1,
  },
  {
    id: '2',
    name: 'Exercise',
    description: '30 minutes of physical activity',
    icon: '💪',
    color: '#10B981',
    frequency: 'daily',
    reminderEnabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 2,
  },
  {
    id: '3',
    name: 'Read',
    description: 'Read at least 20 pages',
    icon: '📚',
    color: '#F59E0B',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '21:00',
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 3,
  },
  {
    id: '4',
    name: 'Drink Water',
    description: '8 glasses throughout the day',
    icon: '💧',
    color: '#3B82F6',
    frequency: 'daily',
    reminderEnabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 4,
  },
  {
    id: '5',
    name: 'Journal',
    description: 'Write about your day',
    icon: '✍️',
    color: '#EC4899',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '22:00',
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 5,
  },
];

interface HabitCardProps {
  status: DailyHabitStatus;
  onToggle: (habitId: string, isCompleted: boolean) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ status, onToggle }) => {
  const { habit, isCompleted, streak, isStreakAtRisk } = status;
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePress = useCallback(() => {
    // Bounce animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onToggle(habit.id, !isCompleted);
  }, [habit.id, isCompleted, onToggle, scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.habitCard,
          isCompleted && styles.habitCardCompleted,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.habitLeft}>
          <View
            style={[
              styles.habitIcon,
              { backgroundColor: habit.color + '20' },
              isCompleted && { backgroundColor: habit.color + '40' },
            ]}
          >
            <Text style={styles.habitIconText}>{habit.icon}</Text>
          </View>
          <View style={styles.habitInfo}>
            <Text
              style={[
                styles.habitName,
                isCompleted && styles.habitNameCompleted,
              ]}
            >
              {habit.name}
            </Text>
            {habit.description && (
              <Text
                style={[
                  styles.habitDescription,
                  isCompleted && styles.habitDescriptionCompleted,
                ]}
                numberOfLines={1}
              >
                {habit.description}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.habitRight}>
          {streak > 0 && (
            <View style={[styles.streakBadge, isStreakAtRisk && styles.streakAtRisk]}>
              <Text style={styles.streakIcon}>🔥</Text>
              <Text style={[styles.streakText, isStreakAtRisk && styles.streakTextRisk]}>
                {streak}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.checkbox,
              { borderColor: habit.color },
              isCompleted && { backgroundColor: habit.color, borderColor: habit.color },
            ]}
          >
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface TodayScreenProps {
  onAddHabit?: () => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({ onAddHabit }) => {
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const today = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const habitStatuses = useMemo(() => {
    return getDailyHabitStatuses(SAMPLE_HABITS, completions);
  }, [completions]);

  const completedCount = useMemo(() => {
    return habitStatuses.filter(s => s.isCompleted).length;
  }, [habitStatuses]);

  const progressPercent = useMemo(() => {
    if (habitStatuses.length === 0) return 0;
    return Math.round((completedCount / habitStatuses.length) * 100);
  }, [completedCount, habitStatuses.length]);

  const handleToggle = useCallback((habitId: string, shouldComplete: boolean) => {
    if (shouldComplete) {
      const newCompletion = createCompletion(habitId);
      setCompletions(prev => [...prev, newCompletion]);
    } else {
      setCompletions(prev => prev.filter(c => c.habitId !== habitId));
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const allCompleted = completedCount === habitStatuses.length && habitStatuses.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting} 👋</Text>
          <Text style={styles.date}>{today}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddHabit}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <Text style={styles.progressCount}>
            {completedCount}/{habitStatuses.length} completed
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progressPercent}%` },
              allCompleted && styles.progressBarComplete,
            ]}
          />
        </View>
        {allCompleted && (
          <View style={styles.completedMessage}>
            <Text style={styles.completedEmoji}>🎉</Text>
            <Text style={styles.completedText}>All habits completed!</Text>
          </View>
        )}
      </View>

      {/* Habits List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {habitStatuses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌱</Text>
            <Text style={styles.emptyTitle}>No habits for today</Text>
            <Text style={styles.emptySubtitle}>
              Tap the + button to create your first habit
            </Text>
          </View>
        ) : (
          <>
            {/* Pending habits */}
            {habitStatuses.filter(s => !s.isCompleted).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>To Do</Text>
                {habitStatuses
                  .filter(s => !s.isCompleted)
                  .map(status => (
                    <HabitCard
                      key={status.habit.id}
                      status={status}
                      onToggle={handleToggle}
                    />
                  ))}
              </View>
            )}

            {/* Completed habits */}
            {habitStatuses.filter(s => s.isCompleted).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Completed</Text>
                {habitStatuses
                  .filter(s => s.isCompleted)
                  .map(status => (
                    <HabitCard
                      key={status.habit.id}
                      status={status}
                      onToggle={handleToggle}
                    />
                  ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },
  date: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  progressCount: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.light.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 4,
  },
  progressBarComplete: {
    backgroundColor: Colors.light.success,
  },
  completedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  completedEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.success,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  habitCardCompleted: {
    opacity: 0.7,
    backgroundColor: Colors.light.background,
  },
  habitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  habitIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitIconText: {
    fontSize: 24,
  },
  habitInfo: {
    marginLeft: 14,
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  habitNameCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.light.textSecondary,
  },
  habitDescription: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  habitDescriptionCompleted: {
    textDecorationLine: 'line-through',
  },
  habitRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.streak + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  streakAtRisk: {
    backgroundColor: Colors.light.warning + '20',
  },
  streakIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.streak,
  },
  streakTextRisk: {
    color: Colors.light.warning,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
