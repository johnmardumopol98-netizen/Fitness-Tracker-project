import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import WorkoutListScreen from '../screens/WorkoutListScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import EditWorkoutScreen from '../screens/EditWorkoutScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  AddWorkout: undefined;
  WorkoutDetails: { workoutId: string };
  EditWorkout: { workoutId: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#16A34A',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Fitness Tracker' }}
        />

        <Stack.Screen
          name="Workouts"
          component={WorkoutListScreen}
          options={{ title: 'My Workouts' }}
        />

        <Stack.Screen
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ title: 'Add Workout' }}
        />

        <Stack.Screen
          name="WorkoutDetails"
          component={WorkoutDetailsScreen}
          options={{ title: 'Workout Details' }}
        />

        <Stack.Screen
          name="EditWorkout"
          component={EditWorkoutScreen}
          options={{ title: 'Edit Workout' }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
