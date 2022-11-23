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
import {
  createTeacher,
  deleteTeacher,
  getSubjects,
  getTeacher,
  getTeachers,
  updateTeacher,
} from '../../rce/api';
import { TeacherWithSubjects } from '../../rce/contracts';
import { TeacherSchema } from '../../rce/schemas';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      ssrTeachers: await getTeachers(),
    },
  };
};

interface TeachersProps {
  ssrTeachers: TeacherWithSubjects[];
}

export default function Teachers({ ssrTeachers }: TeachersProps) {
  const queryClient = useQueryClient();

  const { data: teachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers,
    initialData: ssrTeachers,
  });

  const { mutate: deleteSelectedTeachers } = useMutation({
    mutationFn: (selectedItems: number[]) =>
      Promise.all(selectedItems.map(id => deleteTeacher(id))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });

  return (
    <>
      <Head>
        <title>Админ - преподаватели</title>
      </Head>
      <Layout>
        <AdminSidebar />
        <Table
          title="Преподаватели"
          heads={['Имя', 'Фамилия', 'Отчество', 'Предметы']}
          editableRaw={<EditTeacher />}
          onDelete={deleteSelectedTeachers}
        >
          {teachers.map(teacher => (
            <TableRow key={teacher.id} id={teacher.id}>
              <TableData>{teacher.firstName}</TableData>
              <TableData>{teacher.lastName}</TableData>
              <TableData>{teacher.patronymic}</TableData>
              <TableData>
                {teacher.subjects.map(({ subject }) => subject.name).toString()}
              </TableData>
            </TableRow>
          ))}
        </Table>
      </Layout>
    </>
  );
}

function EditTeacher() {
  const { editingItemId } = useContext(tableContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const { data: subjects, status } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
  });

  useQuery({
    queryKey: ['teachers', editingItemId],
    queryFn: () => getTeacher(editingItemId as number),
    onSuccess: data => {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPatronymic(data.patronymic);
      setSelectedSubjects(data.subjects.map(({ subject }) => subject.id));
    },
    enabled: typeof editingItemId === 'number',
  });

  const mutationFn = async (data: z.infer<typeof TeacherSchema>) => {
    if (typeof editingItemId === 'number') {
      return updateTeacher(editingItemId, data);
    }
    return createTeacher(data);
  };

  const { mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(['teachers']);
    },
  });

  const save = async () => {
    mutate({
      firstName,
      lastName,
      patronymic,
      subjects: selectedSubjects,
    });
  };

  const { success: canSave } = TeacherSchema.safeParse({
    firstName,
    lastName,
    patronymic,
    subjects: selectedSubjects,
  });

  return (
    <TableEditRaw onSave={save} canSave={canSave}>
      <TableData>
        <InputText
          placeholder="Имя"
          pattern="[а-яА-Я\s]+"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          placeholder="Фамилия"
          pattern="[а-яА-Я\s]+"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </TableData>
      <TableData>
        <InputText
          placeholder="Отчество"
          pattern="[а-яА-Я\s]+"
          required
          value={patronymic}
          onChange={e => setPatronymic(e.target.value)}
        />
      </TableData>
      <TableData>
        {status === 'success' ? (
          <Select
            type="many"
            active={selectedSubjects}
            setActive={setSelectedSubjects}
          >
            {subjects.map(subject => (
              <Option key={subject.id} id={subject.id} value={subject.name} />
            ))}
          </Select>
        ) : (
          <>'placeholder'</>
        )}
      </TableData>
    </TableEditRaw>
  );
}
