import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TodayScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
      <Text style={styles.subtitle}>Your habits for today will appear here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
});
