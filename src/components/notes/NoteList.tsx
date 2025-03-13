'use client';

import { useState } from 'react';
import { Note } from '@/types/notes';
import { useNotes } from '@/lib/hooks/useNotes';

interface NoteListProps {
    habitId?: string;
}

export default function NoteList({ habitId }: NoteListProps) {
    const { notes, loading, error, updateNote, deleteNote } = useNotes();
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');

    const displayNotes = habitId 
        ? notes.filter(note => note.habitId === habitId)
        : notes;

    const handleEdit = (note: Note) => {
        setEditingNoteId(note.id);
        setEditContent(note.content);
    };

    const handleSave = (noteId: string) => {
        updateNote(noteId, editContent);
        setEditingNoteId(null);
        setEditContent('');
    };

    if (loading) {
        return <div className="animate-pulse">Loading notes...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-4">
            {displayNotes.map(note => (
                <div key={note.id} className="bg-white p-4 rounded-lg shadow">
                    {editingNoteId === note.id ? (
                        <div className="space-y-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setEditingNoteId(null)}
                                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSave(note.id)}
                                    className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-800">{note.content}</p>
                            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEdit(note)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
