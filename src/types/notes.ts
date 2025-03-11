export interface Note {
    id: string;
    content: string;
    habitId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type NoteList = Note[];