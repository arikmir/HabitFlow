import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { TodayScreen, StatsScreen, SettingsScreen, AddHabitScreen } from '@/screens';
import { Colors } from '@/constants';
import { CreateHabitInput } from '@/types';

const Tab = createBottomTabNavigator();

// Tab bar icon component
const TabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => (
  <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
    <Text style={[styles.icon, focused && styles.iconFocused]}>{icon}</Text>
  </View>
);

export default function App() {
  const [showAddHabit, setShowAddHabit] = useState(false);

  const handleAddHabit = () => {
    setShowAddHabit(true);
  };

  const handleSaveHabit = (habit: CreateHabitInput) => {
    console.log('New habit:', habit);
    // TODO: Save to storage
    setShowAddHabit(false);
  };

  const handleCancelAdd = () => {
    setShowAddHabit(false);
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: Colors.light.primary,
          tabBarInactiveTintColor: Colors.light.textSecondary,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tab.Screen
          name="Today"
          options={{
            tabBarIcon: ({ focused }) => <TabIcon icon="📅" focused={focused} />,
          }}
        >
          {() => <TodayScreen onAddHabit={handleAddHabit} />}
        </Tab.Screen>
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon icon="⚙️" focused={focused} />,
          }}
        />
      </Tab.Navigator>

      {/* Add Habit Modal */}
      <Modal
        visible={showAddHabit}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <AddHabitScreen onSave={handleSaveHabit} onCancel={handleCancelAdd} />
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 8,
    paddingBottom: 8,
    height: 88,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerFocused: {
    backgroundColor: Colors.light.primary + '15',
  },
  icon: {
    fontSize: 22,
  },
  iconFocused: {
    transform: [{ scale: 1.1 }],
  },
});
