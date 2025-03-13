'use client';

import { useState } from 'react';
import { useNotes } from '@/lib/hooks/useNotes';
import { useHabits } from '@/lib/hooks/useHabits';

interface NewNoteButtonProps {
    habitId?: string;
}

export default function NewNoteButton({ habitId }: NewNoteButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('');
    const [selectedHabitId, setSelectedHabitId] = useState(habitId || '');
    
    const { addNote } = useNotes();
    const { habits } = useHabits();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            addNote(content, selectedHabitId || undefined);
            setContent('');
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
                + New Note
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add New Note</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Note Content
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    placeholder="Write your note here..."
                                />
                            </div>

                            {!habitId && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Related Habit (Optional)
                                    </label>
                                    <select
                                        value={selectedHabitId}
                                        onChange={(e) => setSelectedHabitId(e.target.value)}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="">No habit</option>
                                        {habits.map(habit => (
                                            <option key={habit.id} value={habit.id}>
                                                {habit.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                                >
                                    Add Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
