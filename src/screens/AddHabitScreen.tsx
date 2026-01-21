import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Input, Button, ColorPicker, IconPicker, FrequencySelector } from '@/components';
import { Colors } from '@/constants';
import { HabitFrequency, DayOfWeek, DAYS_OF_WEEK, CreateHabitInput } from '@/types';
import { HABIT_COLORS } from '@/components/ui/ColorPicker';

interface AddHabitScreenProps {
  onSave?: (habit: CreateHabitInput) => void;
  onCancel?: () => void;
}

export const AddHabitScreen: React.FC<AddHabitScreenProps> = ({
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('💪');
  const [color, setColor] = useState(HABIT_COLORS[0]);
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [targetDays, setTargetDays] = useState<DayOfWeek[]>([...DAYS_OF_WEEK]);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');

  const [errors, setErrors] = useState<{ name?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Habit name is required';
    } else if (name.length > 50) {
      newErrors.name = 'Habit name must be less than 50 characters';
    }

    if (frequency !== 'daily' && targetDays.length === 0) {
      newErrors.name = 'Please select at least one day';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const habitInput: CreateHabitInput = {
      name: name.trim(),
      description: description.trim() || undefined,
      icon,
      color,
      frequency,
      targetDays: frequency === 'daily' ? undefined : targetDays,
      reminderEnabled,
      reminderTime: reminderEnabled ? reminderTime : undefined,
    };

    onSave?.(habitInput);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.title}>New Habit</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Preview Card */}
          <View style={[styles.previewCard, { backgroundColor: color + '20' }]}>
            <View style={[styles.previewIcon, { backgroundColor: color }]}>
              <Text style={styles.previewIconText}>{icon}</Text>
            </View>
            <Text style={styles.previewName}>{name || 'Habit name'}</Text>
            {description ? (
              <Text style={styles.previewDescription}>{description}</Text>
            ) : null}
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Habit Name"
              placeholder="e.g., Morning meditation"
              value={name}
              onChangeText={setName}
              error={errors.name}
              maxLength={50}
            />

            <Input
              label="Description (optional)"
              placeholder="Add a description..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={2}
              style={styles.descriptionInput}
            />

            <IconPicker
              label="Choose an icon"
              selectedIcon={icon}
              onIconSelect={setIcon}
              selectedColor={color}
            />

            <ColorPicker
              label="Choose a color"
              selectedColor={color}
              onColorSelect={setColor}
            />

            <FrequencySelector
              label="How often?"
              frequency={frequency}
              targetDays={targetDays}
              onFrequencyChange={setFrequency}
              onTargetDaysChange={setTargetDays}
              selectedColor={color}
            />

            {/* Reminder Toggle */}
            <View style={styles.reminderSection}>
              <View style={styles.reminderHeader}>
                <Text style={styles.label}>Reminder</Text>
                <TouchableOpacity
                  style={[
                    styles.toggle,
                    reminderEnabled && [styles.toggleActive, { backgroundColor: color }],
                  ]}
                  onPress={() => setReminderEnabled(!reminderEnabled)}
                >
                  <View
                    style={[
                      styles.toggleKnob,
                      reminderEnabled && styles.toggleKnobActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              {reminderEnabled && (
                <Input
                  placeholder="09:00"
                  value={reminderTime}
                  onChangeText={setReminderTime}
                  keyboardType="numbers-and-punctuation"
                />
              )}
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <Button
            title="Create Habit"
            onPress={handleSave}
            style={[styles.saveButton, { backgroundColor: color }]}
            size="large"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  previewCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  previewIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewIconText: {
    fontSize: 32,
  },
  previewName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
  },
  previewDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  form: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  reminderSection: {
    marginTop: 8,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.light.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    // backgroundColor set dynamically
  },
  toggleKnob: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  saveButton: {
    // backgroundColor set dynamically
  },
});
