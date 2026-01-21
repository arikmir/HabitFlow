import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { HabitFrequency, DayOfWeek, DAYS_OF_WEEK, DAY_SHORT_LABELS } from '@/types';
import { Colors } from '@/constants';

interface FrequencySelectorProps {
  label?: string;
  frequency: HabitFrequency;
  targetDays: DayOfWeek[];
  onFrequencyChange: (frequency: HabitFrequency) => void;
  onTargetDaysChange: (days: DayOfWeek[]) => void;
  selectedColor?: string;
}

const FREQUENCY_OPTIONS: { value: HabitFrequency; label: string; description: string }[] = [
  { value: 'daily', label: 'Daily', description: 'Every day' },
  { value: 'weekly', label: 'Weekly', description: 'Specific days' },
  { value: 'custom', label: 'Custom', description: 'Choose days' },
];

export const FrequencySelector: React.FC<FrequencySelectorProps> = ({
  label,
  frequency,
  targetDays,
  onFrequencyChange,
  onTargetDaysChange,
  selectedColor = Colors.light.primary,
}) => {
  const toggleDay = (day: DayOfWeek) => {
    if (targetDays.includes(day)) {
      onTargetDaysChange(targetDays.filter(d => d !== day));
    } else {
      onTargetDaysChange([...targetDays, day]);
    }
  };

  const showDayPicker = frequency === 'weekly' || frequency === 'custom';

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Frequency Options */}
      <View style={styles.optionsRow}>
        {FREQUENCY_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              frequency === option.value && [
                styles.selectedOption,
                { backgroundColor: selectedColor },
              ],
            ]}
            onPress={() => {
              onFrequencyChange(option.value);
              if (option.value === 'daily') {
                onTargetDaysChange([...DAYS_OF_WEEK]);
              }
            }}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.optionLabel,
                frequency === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Day Picker */}
      {showDayPicker && (
        <View style={styles.daysContainer}>
          <Text style={styles.daysLabel}>Select days</Text>
          <View style={styles.daysRow}>
            {DAYS_OF_WEEK.map(day => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  targetDays.includes(day) && [
                    styles.selectedDay,
                    { backgroundColor: selectedColor },
                  ],
                ]}
                onPress={() => toggleDay(day)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dayText,
                    targetDays.includes(day) && styles.selectedDayText,
                  ]}
                >
                  {DAY_SHORT_LABELS[day]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
  },
  selectedOption: {
    // backgroundColor set dynamically
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  selectedOptionText: {
    color: '#fff',
  },
  daysContainer: {
    marginTop: 16,
  },
  daysLabel: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    // backgroundColor set dynamically
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  selectedDayText: {
    color: '#fff',
  },
});
