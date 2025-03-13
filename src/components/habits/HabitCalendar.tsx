'use client';

import { useState } from 'react';
import type { Habit } from '@/types/habit';

interface HabitCalendarProps {
    habits: Habit[];
    onToggleCompletion: (habitId: string, date: string) => void;
}

export default function HabitCalendar({ habits, onToggleCompletion }: HabitCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getMonthDays = () => {
        const days = [];
        const totalDays = getDaysInMonth(currentDate);
        
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            days.push(date);
        }
        
        return days;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => navigateMonth('prev')}
                    className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    ←
                </button>
                <h2 className="text-xl font-semibold">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button 
                    onClick={() => navigateMonth('next')}
                    className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                    →
                </button>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
                <div className="font-semibold">Habits</div>
                <div className="grid grid-cols-31 gap-1">
                    {getMonthDays().map(date => (
                        <div key={date.getDate()} className="text-center text-sm">
                            {date.getDate()}
                        </div>
                    ))}
                </div>

                {habits.map(habit => (
                    <div key={habit.id} className="contents">
                        <div className="py-2">{habit.name}</div>
                        <div className="grid grid-cols-31 gap-1">
                            {getMonthDays().map(date => {
                                const dateStr = formatDate(date);
                                const isCompleted = habit.completions[dateStr];
                                
                                return (
                                    <button
                                        key={dateStr}
                                        onClick={() => onToggleCompletion(habit.id, dateStr)}
                                        className={`w-full aspect-square rounded-sm border ${
                                            isCompleted 
                                                ? 'bg-green-500 border-green-600' 
                                                : 'bg-white border-gray-200 hover:bg-gray-50'
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}