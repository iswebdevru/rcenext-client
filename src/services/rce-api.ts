import { Subject, Teacher } from './rce-contracts';

export const API = 'http://localhost:3000';

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

interface SaveTeacherDto {
  firstName: string;
  lastName: string;
  patronymic: string;
  subjects: number[];
}

export async function createTeacher(data: SaveTeacherDto) {
  const response = await fetch(`${API}/teachers`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return await response.json();
}

export async function getSubjects() {
  const response = await fetch(`${API}/subjects`);
  return (await response.json()) as Subject[];
}
