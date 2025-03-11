import { Habit } from "@/types/habit";
import { useState } from "react";

// Custom hook for habit management
const useHabits = () => {
    const [habits, setHabits] = useState<Habit[]>([]);

    const toggleCompletion = (habbitId: string, date: string) => {
        // toggle completion logic
    }

    const addHabit = (habit: Omit<Habit, 'id'>) => {
        // habit logic here
    }
}