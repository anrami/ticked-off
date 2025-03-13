'use client';

import NavBar from "../components/layout/navbar";
import HabitCalendar from "../components/habits/HabitCalendar";
import NoteList from "../components/notes/NoteList";
import NewNoteButton from "../components/notes/NewNoteButton";
import NewHabitButton from "../components/habits/NewHabitButton";
import { useHabits } from "@/lib/hooks/useHabits";

export default function Home() {
  const { habits, loading, error, addHabit, toggleCompletion } = useHabits();

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {/* Habits Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Your Habits</h1>
            <NewHabitButton onAddHabit={addHabit} />
          </div>
          
          {habits.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No habits yet. Create your first habit to get started!</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <HabitCalendar 
                habits={habits} 
                onToggleCompletion={toggleCompletion} 
              />
            </div>
          )}
        </section>

        {/* Notes Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Notes & Reflections</h2>
            <NewNoteButton />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <NoteList />
          </div>
        </section>
      </main>
    </div>
  );
}
