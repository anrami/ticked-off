'use client';

import NavBar from "../components/layout/navbar";
import HabitCalendar from "../components/habits/HabitCalendar";
import { useHabits } from "@/lib/hooks/useHabits";

export default function Home() {
  const { habits, loading, error, addHabit, toggleCompletion } = useHabits();

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(10vh-64px)]">
          <div className="animate-spin round-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(10vh-64px)]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <NavBar />

    </div>
  );
}
