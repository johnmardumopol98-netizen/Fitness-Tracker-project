import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWorkouts } from '../context/WorkoutContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { workouts } = useWorkouts();

  const completed = workouts.filter(
    (workout) => workout.completed
  ).length;

  const pending = workouts.filter(
    (workout) => !workout.completed
  ).length;

  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.calories,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png',
          }}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Fitness Tracker
        </Text>

        <Text style={styles.subtitle}>
          Track your workouts and stay consistent with your fitness goals.
        </Text>

        <View style={styles.stats}>
          <View style={styles.card}>
            <Text style={styles.number}>
              {workouts.length}
            </Text>
            <Text>Workouts</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.number}>
              {completed}
            </Text>
            <Text>Completed</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.number}>
              {totalCalories}
            </Text>
            <Text>Calories</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>
            Today's Progress
          </Text>

          <Text>
            {completed} completed / {pending} remaining
          </Text>

          {workouts.length > 0 ? (
            <Text style={styles.progressPercent}>
              {Math.round(
                (completed / workouts.length) * 100
              )}
              %
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </View>

        <Pressable
          style={styles.mainButton}
          onPress={() => navigation.navigate('Workouts')}
        >
          <Text style={styles.mainButtonText}>
            View Workouts
          </Text>
        </Pressable>

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text style={styles.addButtonText}>
            + Add Workout
          </Text>
        </Pressable>

        <Pressable
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text>View Profile</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },

  content: {
    padding: 20,
  },

  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    margin: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#14532D',
  },

  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    margin: 8,
    marginBottom: 25,
    lineHeight: 21,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: '31%',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },

  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16A34A',
  },

  progressCard: {
    backgroundColor: '#DCFCE7',
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
  },

  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
  },

  progressPercent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16A34A',
    marginTop: 8,
  },

  mainButton: {
    backgroundColor: '#16A34A',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  mainButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#BBF7D0',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#166534',
    fontWeight: 'bold',
    fontSize: 16,
  },

  profileButton: {
    padding: 18,
    alignItems: 'center',
  },
});
