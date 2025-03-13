'use client';

import { useState } from 'react';
import type { Habit } from '@/types/habit';
import './HabitCalendar.css';

interface HabitCalendarProps {
    habits: Habit[];
    onToggleCompletion: (habitId: string, date: string) => void;
}

export default function HabitCalendar({ habits, onToggleCompletion }: HabitCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const isToday = (date: Date | null) => {
        if (!date) return false;
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
            return newDate;
        });
    };

    const getCompletionCount = (habit: Habit) => {
        return Object.values(habit.completions).filter(Boolean).length;
    };

    const getAllDaysInMonth = () => {
        const days = [];
        const totalDays = getDaysInMonth(currentDate);
        for (let day = 1; day <= totalDays; day++) {
            days.push(day);
        }
        return days;
    };

    const days = getAllDaysInMonth();

    return (
        <section className="ant-layout layout" style={{ paddingTop: '2rem' }}>
            <div className="ant-row">
                <div className="ant-col habit-table-container ant-col-xs-24 ant-col-xs-offset-0 ant-col-sm-24 ant-col-sm-offset-0 ant-col-md-22 ant-col-md-offset-1">
                    <h4 className="month-navigator">
                        <button onClick={() => navigateMonth('prev')} className="nav-button">
                            ←
                        </button>
                        <span className="month-name">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={() => navigateMonth('next')} className="nav-button">
                            →
                        </button>
                    </h4>

                    <div className="ant-table-wrapper">
                        <div className="ant-table ant-table-small ant-table-bordered">
                            <div className="ant-table-container">
                                <div className="ant-table-content">
                                    <table className="habit-table">
                                        <colgroup>
                                            <col style={{ width: '120px' }} />
                                            {days.map((_, i) => (
                                                <col key={i} style={{ width: '40px' }} />
                                            ))}
                                            <col style={{ width: '80px' }} />
                                            <col style={{ width: '80px' }} />
                                        </colgroup>
                                        <thead className="ant-table-thead">
                                            <tr>
                                                <th rowSpan={2} className="ant-table-cell highlight-th">Habits</th>
                                                {days.map(day => (
                                                    <th key={day} className="ant-table-cell th-day">
                                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay()]}
                                                    </th>
                                                ))}
                                                <th rowSpan={2} className="ant-table-cell highlight-th goal">Goal</th>
                                                <th rowSpan={2} className="ant-table-cell highlight-th">Achieved</th>
                                            </tr>
                                            <tr>
                                                {days.map(day => (
                                                    <th key={`num-${day}`} className="ant-table-cell">{day}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="ant-table-tbody">
                                            {habits.map(habit => (
                                                <tr key={habit.id}>
                                                    <td className="ant-table-cell highlight-th">
                                                        <div>{habit.name}</div>
                                                    </td>
                                                    {days.map(day => {
                                                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                                        const dateStr = formatDate(date);
                                                        const isCompleted = habit.completions[dateStr];
                                                        const isTodayCell = isToday(date);

                                                        return (
                                                            <td 
                                                                key={dateStr} 
                                                                className={`ant-table-cell normal-cell${isTodayCell ? ' active-tab' : ''}`}
                                                                onClick={() => onToggleCompletion(habit.id, dateStr)}
                                                                style={{ cursor: 'pointer' }}
                                                            >
                                                                <div className="cell-content">
                                                                    {isCompleted && (
                                                                        <div className="completed" />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        );
                                                    })}
                                                    <td className="ant-table-cell highlight-th goal">10</td>
                                                    <td className="ant-table-cell highlight-th">{getCompletionCount(habit)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}