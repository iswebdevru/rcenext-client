import { z } from 'zod';

export const TeacherSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().min(1),
  subjects: z.number().array(),
});

export const SubjectSchema = z.object({
  name: z.string().min(1),
  teachers: z.number().array(),
});

export const PartialSubjectSchema = SubjectSchema.partial();
export const PartialTeacherSchema = TeacherSchema.partial();
