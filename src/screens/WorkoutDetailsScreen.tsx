import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWorkouts } from '../context/WorkoutContext';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'WorkoutDetails'
>;

export default function WorkoutDetailsScreen({
  route,
  navigation,
}: Props) {
  const { getWorkout, deleteWorkout } = useWorkouts();

  const workout = getWorkout(route.params.workoutId);

  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Workout not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const remove = () =>
    Alert.alert(
      'Delete Workout',
      `Are you sure you want to delete "${workout.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteWorkout(workout.id);
            navigation.navigate('Workouts');
          },
        },
      ]
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.card}>
          <Text style={styles.title}>
            {workout.name}
          </Text>

          {[
            ['Category', workout.category],
            ['Duration', `${workout.duration} minutes`],
            ['Calories', `${workout.calories} kcal`],
            ['Difficulty', workout.difficulty],
            [
              'Status',
              workout.completed
                ? 'Completed'
                : 'Not Completed',
            ],
          ].map(([label, value]) => (
            <View
              style={styles.row}
              key={label}
            >
              <Text style={styles.label}>
                {label}
              </Text>

              <Text>
                {value}
              </Text>
            </View>
          ))}

          <Text style={styles.descriptionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {workout.description}
          </Text>
        </View>

        <View style={styles.button}>
          <Button
            title="Edit Workout"
            onPress={() =>
              navigation.navigate('EditWorkout', {
                workoutId: workout.id,
              })
            }
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete Workout"
            color="#DC2626"
            onPress={remove}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Back to Workouts"
            color="#64748B"
            onPress={() =>
              navigation.navigate('Workouts')
            }
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 14,
    elevation: 2,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 13,
  },

  label: {
    fontWeight: 'bold',
    color: '#475569',
  },

  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },

  description: {
    color: '#475569',
    lineHeight: 23,
  },

  button: {
    marginTop: 15,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
