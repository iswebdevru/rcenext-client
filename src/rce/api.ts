import { z } from 'zod';
import { SubjectWithTeachers, TeacherWithSubjects } from './contracts';
import { SubjectSchema, TeacherSchema } from './schemas';

export const API = 'http://localhost:3000';

export async function getTeachers() {
  const response = await fetch(`${API}/teachers`);
  return (await response.json()) as TeacherWithSubjects[];
}

export async function deleteTeacher(id: number) {
  const response = await fetch(`${API}/teachers/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

export async function createTeacher(data: z.infer<typeof TeacherSchema>) {
  const response = await fetch(`${API}/teachers`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as TeacherWithSubjects;
}

export async function getSubjects() {
  const response = await fetch(`${API}/subjects`);
  return (await response.json()) as SubjectWithTeachers[];
}

export async function deleteSubject(id: number) {
  const response = await fetch(`${API}/subjects/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

export async function createSubject(data: z.infer<typeof SubjectSchema>) {
  const response = await fetch(`${API}/subjects`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as SubjectWithTeachers;
}
