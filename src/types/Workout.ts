export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type Workout = {
  id: string;
  name: string;
  category: string;
  duration: number;
  calories: number;
  difficulty: Difficulty;
  description: string;
  completed: boolean;
};
