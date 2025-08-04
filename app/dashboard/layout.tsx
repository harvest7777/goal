"use client";
import { useEffect } from "react";
import { AuthProvider } from "../auth/auth-context";
import { useGoalStore } from "./stores/useGoalsStore";
import { getGoals } from "./manage-goals/api-helpers";
import Navbar from "./_components/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {setGoals, initialized} = useGoalStore((state) => state);
  useEffect(()=>{
      const initialize = async () => {
          const fetchedGoals = await getGoals();
          setGoals(fetchedGoals);
      }
      if (!initialized) {
          initialize();
      }
  },[setGoals, initialized]);
  return (
      <AuthProvider>
        <Navbar/>
        {children}
      </AuthProvider>
  );
}
