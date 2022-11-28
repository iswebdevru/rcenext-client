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

export const GroupSchema = z.object({
  name: z.string().min(1),
  course: z.number().int(),
  index: z.number().int(),
  block: z.number().int(),
});

export const PartialSubjectSchema = SubjectSchema.partial();
export const PartialTeacherSchema = TeacherSchema.partial();
export const PartialGroupSchema = GroupSchema.partial();
