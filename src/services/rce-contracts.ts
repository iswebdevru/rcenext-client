export interface Subject {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  subjects: { subject: Subject }[];
}

export interface Subject {
  id: number;
  name: string;
  teachers: Omit<Teacher, 'subjects'>[];
}
