export const API = 'http://localhost:3000';

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

export async function getTeachers() {
  const response = await fetch(`${API}/teachers`);
  return (await response.json()) as Teacher[];
}

export async function deleteTeacher(id: number) {
  const response = await fetch(`${API}/teachers/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}
