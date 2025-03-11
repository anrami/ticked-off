import type { Habit } from "./habit";

export interface HabitProgress {
    achieved: number;
    goal: number;
}

export interface MontlyView {
    month: number;
    year: number;
    habits: Habit[];
    days: number[];
}