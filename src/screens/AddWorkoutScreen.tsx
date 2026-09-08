import React, { useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWorkouts } from '../context/WorkoutContext';
import { Difficulty } from '../types/Workout';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AddWorkout'
>;

export default function AddWorkoutScreen({ navigation }: Props) {
  const { addWorkout } = useWorkouts();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] =
    useState<Difficulty>('Beginner');

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (!name.trim()) {
      e.name = 'Workout name is required.';
    } else if (name.trim().length < 3) {
      e.name = 'Minimum 3 characters.';
    }

    if (!category.trim()) {
      e.category = 'Category is required.';
    }

    if (
      !duration.trim() ||
      isNaN(Number(duration)) ||
      Number(duration) <= 0
    ) {
      e.duration = 'Enter a valid duration.';
    }

    if (
      !calories.trim() ||
      isNaN(Number(calories)) ||
      Number(calories) <= 0
    ) {
      e.calories = 'Enter valid calories.';
    }

    if (!description.trim()) {
      e.description = 'Description is required.';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) {
      Alert.alert(
        'Validation Error',
        'Please fix all required fields.'
      );
      return;
    }

    addWorkout({
      id: Date.now().toString(),
      name: name.trim(),
      category: category.trim(),
      duration: Number(duration),
      calories: Number(calories),
      difficulty,
      description: description.trim(),
      completed: false,
    });

    Alert.alert(
      'Success',
      'Workout added successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Workouts'),
        },
      ]
    );
  };

  const field = (
    label: string,
    value: string,
    setter: (s: string) => void,
    key: string,
    keyboardType?: 'numeric'
  ) => (
    <>
      <Text style={styles.label}>{label} *</Text>

      <TextInput
        style={[
          styles.input,
          errors[key] && styles.errorInput,
        ]}
        placeholder={label}
        value={value}
        onChangeText={setter}
        keyboardType={keyboardType}
      />

      {errors[key] && (
        <Text style={styles.error}>
          {errors[key]}
        </Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>
          Add New Workout
        </Text>

        {field(
          'Workout Name',
          name,
          setName,
          'name'
        )}

        {field(
          'Category',
          category,
          setCategory,
          'category'
        )}

        {field(
          'Duration in Minutes',
          duration,
          setDuration,
          'duration',
          'numeric'
        )}

        {field(
          'Calories',
          calories,
          setCalories,
          'calories',
          'numeric'
        )}

        <Text style={styles.label}>
          Difficulty
        </Text>

        <View style={styles.difficultyRow}>
          {(
            [
              'Beginner',
              'Intermediate',
              'Advanced',
            ] as Difficulty[]
          ).map((x) => (
            <Pressable
              key={x}
              style={[
                styles.difficultyButton,
                difficulty === x && styles.selected,
              ]}
              onPress={() => setDifficulty(x)}
            >
              <Text
                style={
                  difficulty === x
                    ? styles.selectedText
                    : styles.difficultyText
                }
              >
                {x}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>
          Description *
        </Text>

        <TextInput
          style={[
            styles.textArea,
            errors.description && styles.errorInput,
          ]}
          placeholder="Describe this workout..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        {errors.description && (
          <Text style={styles.error}>
            {errors.description}
          </Text>
        )}

        <View style={styles.button}>
          <Button
            title="Save Workout"
            onPress={save}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Cancel"
            color="#64748B"
            onPress={() => navigation.goBack()}
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

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 15,
  },

  label: {
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 13,
    marginBottom: 7,
  },

  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    padding: 13,
  },

  textArea: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    padding: 13,
    minHeight: 120,
    textAlignVertical: 'top',
  },

  errorInput: {
    borderColor: '#DC2626',
  },

  error: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 5,
  },

  difficultyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },

  difficultyButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 11,
    borderRadius: 8,
    marginRight: 7,
    marginBottom: 7,
  },

  selected: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },

  difficultyText: {
    color: '#475569',
    fontWeight: '600',
  },

  selectedText: {
    color: '#FFF',
  },

  button: {
    marginTop: 15,
  },
});
