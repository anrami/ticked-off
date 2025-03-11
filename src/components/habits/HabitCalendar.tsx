import { Habit } from "@/types/habit";

interface CalendarProps {
    month: number;
    year: number;
    habits: Habit[];
    onToggleCompletion: (habitId: string, date: string) => void;
}