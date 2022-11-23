import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { z } from 'zod';
import InputText from '../../components/common/InputText';
import Select, { Option } from '../../components/common/Select';
import Table, {
  tableContext,
  TableData,
  TableEditRaw,
  TableRow,
} from '../../components/features/Table';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Layout from '../../components/layout/Layout';
import { shortTeacherName } from '../../lib/text-formatters';
import {
  createSubject,
  deleteSubject,
  getSubject,
  getSubjects,
  getTeachers,
  updateSubject,
} from '../../rce/api';
import { SubjectWithTeachers } from '../../rce/contracts';
import { SubjectSchema } from '../../rce/schemas';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ssrSubjects: await getSubjects(),
    },
  };
};

interface SubjectProps {
  ssrSubjects: SubjectWithTeachers[];
}

export default function Subjects({ ssrSubjects }: SubjectProps) {
  const queryClient = useQueryClient();

  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
    initialData: ssrSubjects,
  });

  const { mutate: deleteSelectedSubjects } = useMutation({
    mutationFn: async (selectedItems: number[]) =>
      Promise.all(selectedItems.map(id => deleteSubject(id))),
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });

  return (
    <>
      <Head>
        <title>Админ - предметы</title>
      </Head>
      <Layout>
        <AdminSidebar />
        <Table
          title="Предметы"
          heads={['Название', 'Преподаватели']}
          editableRaw={<EditSubject />}
          onDelete={deleteSelectedSubjects}
        >
          {subjects.map(subject => (
            <TableRow key={subject.id} id={subject.id}>
              <TableData>{subject.name}</TableData>
              <TableData>
                {subject.teachers
                  .map(({ teacher }) => shortTeacherName(teacher))
                  .toString()}
              </TableData>
            </TableRow>
          ))}
        </Table>
      </Layout>
    </>
  );
}

function EditSubject() {
  const [name, setName] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const { editingItemId } = useContext(tableContext);

  const queryClient = useQueryClient();

  useQuery({
    queryKey: ['subjects', editingItemId],
    queryFn: () => getSubject(editingItemId as number),
    onSuccess: data => {
      setName(data.name);
      setSelectedTeachers(data.teachers.map(teacher => teacher.teacher.id));
    },
    enabled: typeof editingItemId === 'number',
  });

  const { data: teachers, status: statusOfTeachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers,
  });

  const mutationFn = async (data: z.infer<typeof SubjectSchema>) => {
    if (typeof editingItemId === 'number') {
      return updateSubject(editingItemId, data);
    }
    return createSubject(data);
  };

  const { mutate: saveSubject } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });

  const { success: canSave } = SubjectSchema.safeParse({
    name,
    teachers: selectedTeachers,
  });

  const save = () => {
    saveSubject({
      name,
      teachers: selectedTeachers,
    });
  };

  return (
    <TableEditRaw canSave={canSave} onSave={save}>
      <TableData>
        <InputText
          pattern="[а-яА-Я\s]+"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </TableData>
      <TableData>
        {statusOfTeachers === 'success' ? (
          <Select
            type="many"
            active={selectedTeachers}
            setActive={setSelectedTeachers}
          >
            {teachers.map(teacher => (
              <Option
                key={teacher.id}
                id={teacher.id}
                value={shortTeacherName(teacher)}
              />
            ))}
          </Select>
        ) : undefined}
      </TableData>
    </TableEditRaw>
  );
}
