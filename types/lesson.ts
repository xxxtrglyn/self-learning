export interface Lesson {
  id: string;
  documentId: string;
  lessonName: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}
