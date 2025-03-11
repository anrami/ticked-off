import { useState, useEffect } from 'react';
import type { Habit, HabitList } from '@/types/habit';

// Custom hook for habit management
export const useHabits = () => {
    const [habits, setHabits] = useState<HabitList>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Load habits from localStorage on mount
        const loadHabits = () => {
            try {
                const savedHabits = localStorage.getItem('habits');
                if (savedHabits) {
                    setHabits(JSON.parse(savedHabits));
                }
            } catch (err) {
                setError('Failed to load habits');
            } finally {
                setLoading(false);
            }
        };
        loadHabits();
    }, []);

    const saveHabits = (updatedHabits: HabitList) => {
        try {
            localStorage.setItem('habits', JSON.stringify(updatedHabits));
            setHabits(updatedHabits);
        } catch (err) {
            setError('Failed to save habits');
        }
    };

    const addHabit = (name: string) => {
        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name,
            goal: 0,
            completions: {},
            createdAt: new Date(),
            updatedAt: new Date()
        };
        saveHabits([...habits, newHabit]);
    };

    const toggleCompletion = (habitId: string, date: string) => {
        const updatedHabits = habits.map(habit => {
            if (habit.id === habitId) {
                const updatedCompletions = { ...habit.completions };
                updatedCompletions[date] = !updatedCompletions[date];
                return {
                    ...habit,
                    completions: updatedCompletions,
                    updatedAt: new Date()
                };
            }
            return habit;
        });
        saveHabits(updatedHabits);
    };

    const deleteHabit = (habitId: string) => {
        const updatedHabits = habits.filter(habit => habit.id !== habitId);
        saveHabits(updatedHabits);
    };

    return {
        habits,
        loading,
        error,
        addHabit,
        toggleCompletion,
        deleteHabit
    };
};