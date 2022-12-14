import { z } from 'zod';
import { Group, SubjectWithTeachers, TeacherWithSubjects } from './contracts';
import {
  GroupSchema,
  PartialGroupSchema,
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

export async function createGroup(data: z.infer<typeof GroupSchema>) {
  const response = await fetch(`${API}/groups`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as Group;
}

export async function getGroups() {
  const response = await fetch(`${API}/groups`);
  return (await response.json()) as Group[];
}

export async function getGroup(id: number) {
  const response = await fetch(`${API}/groups/${id}`);
  return (await response.json()) as Group;
}

export async function updateGroup(
  id: number,
  data: z.infer<typeof PartialGroupSchema>
) {
  const response = await fetch(`${API}/groups/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: [['Content-Type', 'application/json']],
  });
  return (await response.json()) as Group;
}

export async function deleteGroup(id: number) {
  const response = await fetch(`${API}/groups/${id}`, { method: 'DELETE' });
  return await response.json();
}
