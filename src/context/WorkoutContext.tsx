import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { Workout } from '../types/Workout';

type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  toggleCompleted: (id: string) => void;
  getWorkout: (id: string) => Workout | undefined;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

const workoutJSON = `[
  {
    "id": "1",
    "name": "Push Ups",
    "category": "Strength",
    "duration": 15,
    "calories": 100,
    "difficulty": "Beginner",
    "description": "A simple upper-body exercise that targets the chest, shoulders, and arms.",
    "completed": false
  },
  {
    "id": "2",
    "name": "Running",
    "category": "Cardio",
    "duration": 30,
    "calories": 300,
    "difficulty": "Intermediate",
    "description": "A cardio workout designed to improve endurance and cardiovascular health.",
    "completed": true
  },
  {
    "id": "3",
    "name": "Squats",
    "category": "Legs",
    "duration": 20,
    "calories": 180,
    "difficulty": "Beginner",
    "description": "A lower-body exercise that strengthens the legs and glutes.",
    "completed": false
  }
]`;

export const WorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    try {
      return JSON.parse(workoutJSON) as Workout[];
    } catch {
      return [];
    }
  });

  const addWorkout = (workout: Workout) => {
    setWorkouts((currentWorkouts) => [
      workout,
      ...currentWorkouts,
    ]);
  };

  const updateWorkout = (workout: Workout) => {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.map((item) =>
        item.id === workout.id ? workout : item
      )
    );
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.filter((item) => item.id !== id)
    );
  };

  const toggleCompleted = (id: string) => {
    setWorkouts((currentWorkouts) =>
      currentWorkouts.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const getWorkout = (id: string) => {
    return workouts.find((item) => item.id === id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        toggleCompleted,
        getWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      'useWorkouts must be used inside WorkoutProvider'
    );
  }

  return context;
};
