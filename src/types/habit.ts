export interface Habit {
    id: string;
    name: string;
    goal?: number;
    completions: {
        [date: string]: boolean;
    }
    createdAt: Date;
    updatedAt: Date;
}

export type HabitList = Habit[];