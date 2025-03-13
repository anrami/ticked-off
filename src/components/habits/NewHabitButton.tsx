'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface NewHabitButtonProps {
    onAddHabit: (name: string) => void;
}

export default function NewHabitButton({ onAddHabit }: NewHabitButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [habitName, setHabitName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (habitName.trim()) {
            onAddHabit(habitName);
            setHabitName('');
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                variant="primary"
            >
                + New Habit
            </Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Habit"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="habitName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Habit Name
                        </label>
                        <input
                            id="habitName"
                            type="text"
                            value={habitName}
                            onChange={(e) => setHabitName(e.target.value)}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="e.g., Read for 30 minutes"
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!habitName.trim()}
                        >
                            Create Habit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
