import { z } from 'zod';
import { SubjectWithTeachers, TeacherWithSubjects } from './contracts';
import {
  PartialSubjectSchema,
  PartialTeacherSchema,
  SubjectSchema,
  TeacherSchema,
} from './schemas';

export const API = 'http://localhost:3000';

export async function createTeacher(data: z.infer<typeof TeacherSchema>) {
  const response = await fetch(`${API}/teachers`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as TeacherWithSubjects;
}

export async function getTeachers() {
  const response = await fetch(`${API}/teachers`);
  return (await response.json()) as TeacherWithSubjects[];
}

export async function getTeacher(id: number) {
  const response = await fetch(`${API}/teachers/${id}`);
  return (await response.json()) as TeacherWithSubjects;
}

export async function updateTeacher(
  id: number,
  data: z.infer<typeof PartialTeacherSchema>
) {
  const response = await fetch(`${API}/teachers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as TeacherWithSubjects;
}

export async function deleteTeacher(id: number) {
  const response = await fetch(`${API}/teachers/${id}`, {
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

export async function getSubjects() {
  const response = await fetch(`${API}/subjects`);
  return (await response.json()) as SubjectWithTeachers[];
}

export async function getSubject(id: number) {
  const response = await fetch(`${API}/subjects/${id}`);
  return (await response.json()) as SubjectWithTeachers;
}

export async function updateSubject(
  id: number,
  data: z.infer<typeof PartialSubjectSchema>
) {
  const response = await fetch(`${API}/subjects/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as SubjectWithTeachers;
}

export async function deleteSubject(id: number) {
  const response = await fetch(`${API}/subjects/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}
