import { create } from "zustand";

interface GoalState {
  goals: Goal[] | null;
  selectedGoal?: Goal | null;
  initialized: boolean;
}

interface GoalActions {
  addGoal: (goal: Goal) => void;
  deleteGoal: (id: number) => void;
  setGoals: (goals: Goal[] | null) => void;
  updateGoal: (goal: Goal) => void;
  setSelectedGoal: (goal: Goal | null) => void;
  markInitialized: () => void;
}

type GoalStore = GoalState & GoalActions;

export const useGoalStore = create<GoalStore>((set) => ({
    goals: null, 
    selectedGoal: null,
    initialized: false,

    addGoal: (goal) =>
        set((state) => ({
        goals: state.goals ? [...state.goals, goal] : [goal],
        })),

    deleteGoal: (id) =>
        set((state) => ({
        goals: state.goals ? state.goals.filter((g) => g.id !== id) : null,
        })),
    updateGoal: (goal) =>
        set((state) => ({
            goals: state.goals ? state.goals.map((g) => (g.id === goal.id ? goal : g)) : null,
        })),
    setGoals: (goals) => set({ goals }),
    setSelectedGoal: (goal) => set({ selectedGoal: goal }),
    markInitialized: () => set({ initialized: true }),
}));
