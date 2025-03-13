import { useState, useEffect } from 'react';
import type { Note, NoteList } from '@/types/notes';

export const useNotes = () => {
    const [notes, setNotes] = useState<NoteList>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotes = () => {
            try {
                const savedNotes = localStorage.getItem('notes');
                if (savedNotes) {
                    setNotes(JSON.parse(savedNotes));
                }
            } catch (err) {
                setError('Failed to load notes');
            } finally {
                setLoading(false);
            }
        };
        loadNotes();
    }, []);

    const saveNotes = (updatedNotes: NoteList) => {
        try {
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
            setNotes(updatedNotes);
        } catch (err) {
            setError('Failed to save notes');
        }
    };

    const addNote = (content: string, habitId?: string) => {
        const newNote: Note = {
            id: crypto.randomUUID(),
            content,
            habitId,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        saveNotes([...notes, newNote]);
    };

    const updateNote = (noteId: string, content: string) => {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    content,
                    updatedAt: new Date()
                };
            }
            return note;
        });
        saveNotes(updatedNotes);
    };

    const deleteNote = (noteId: string) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        saveNotes(updatedNotes);
    };

    const getNotesByHabit = (habitId: string) => {
        return notes.filter(note => note.habitId === habitId);
    };

    return {
        notes,
        loading,
        error,
        addNote,
        updateNote,
        deleteNote,
        getNotesByHabit
    };
};