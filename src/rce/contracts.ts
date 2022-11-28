export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name: string;
  course: number;
  index: number;
  block: number;
}

export interface TeacherWithSubjects extends Teacher {
  subjects: { subject: Subject }[];
}

export interface SubjectWithTeachers extends Subject {
  teachers: { teacher: Teacher }[];
}
