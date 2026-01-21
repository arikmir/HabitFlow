import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants';

const HABIT_ICONS = [
  // Health & Fitness
  '💪', '🏃', '🚴', '🏋️', '🧘', '🥗', '💧', '😴', '🛌',
  // Productivity
  '📚', '✍️', '💻', '📝', '🎯', '⏰', '📅', '✅',
  // Wellness
  '🧠', '🧘‍♀️', '🌅', '🌙', '☀️', '🌿', '🍃',
  // Social
  '👥', '💬', '📞', '❤️', '🤝', '👨‍👩‍👧',
  // Finance
  '💰', '💵', '📊', '🏦', '💳',
  // Hobbies
  '🎨', '🎸', '📷', '🎮', '🎬', '🎵', '📖',
  // Self-care
  '🛁', '💅', '🪥', '💊', '🩺',
  // Other
  '⭐', '🔥', '🌟', '💎', '🎉', '🚀', '🌈',
];

interface IconPickerProps {
  label?: string;
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
  selectedColor?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  label,
  selectedIcon,
  onIconSelect,
  selectedColor = Colors.light.primary,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {HABIT_ICONS.map((icon, index) => (
          <TouchableOpacity
            key={`${icon}-${index}`}
            style={[
              styles.iconButton,
              selectedIcon === icon && [
                styles.selectedIcon,
                { borderColor: selectedColor },
              ],
            ]}
            onPress={() => onIconSelect(icon)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{icon}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export { HABIT_ICONS };

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
  scrollContent: {
    gap: 8,
    paddingRight: 16,
  },
  iconButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedIcon: {
    borderWidth: 2,
  },
  icon: {
    fontSize: 28,
  },
});
