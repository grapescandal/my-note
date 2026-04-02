export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export type Notes = Note[];
