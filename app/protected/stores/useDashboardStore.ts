import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardState {
  view: string | null;
  date: Date | undefined;
}

interface DashboardActions {
  setView: (view: string | null) => void;
  setDate: (date: Date | undefined) => void;
}

type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      view: null,
      date: undefined,

      setView: (view) => set({ view }),
      setDate: (date) => set({ date }),
    }),
    {
      name: "dashboard-storage", // localStorage key
      partialize: (state) => ({ view: state.view, date: state.date }),
      // Optional: serialize/deserialize date correctly
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          const parsed = JSON.parse(item);
          // Rehydrate date as Date instance
          if (parsed.state.date) {
            parsed.state.date = new Date(parsed.state.date);
          }
          return parsed;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
