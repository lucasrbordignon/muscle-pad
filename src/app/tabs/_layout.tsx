import { Stack } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="home" 
        options={{ 
          title: 'MUSCLEPAD', 
          headerStyle: {
            backgroundColor: '#3b82f6'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
          headerTitleAlign: 'center'
        }} 
      />

      <Stack.Screen 
        name="workout" 
        options={{ 
          title: 'MUSCLEPAD', 
          headerStyle: {
            backgroundColor: '#3b82f6'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'semibold',
          },
          headerTitleAlign: 'center'
        }} 
      />
      {/* <Stack.Screen name="logs" options={{ title: 'Logs' }} /> */}
    </Stack>
  );
}
