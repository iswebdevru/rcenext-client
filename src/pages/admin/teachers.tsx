import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { z } from 'zod';
import InputText from '../../components/common/InputText';
import Select, { Option } from '../../components/common/Select';
import Table, {
  TableData,
  TableEditRaw,
  TableRow,
} from '../../components/features/Table';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Container from '../../components/layout/Container';
import Layout from '../../components/layout/Layout';
import {
  createTeacher,
  deleteTeacher,
  getSubjects,
  getTeachers,
} from '../../services/rce-api';
import { Teacher } from '../../services/rce-contracts';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      teachers: await getTeachers(),
    },
  };
};

export default function Teachers({ teachers }: { teachers: Teacher[] }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers,
    initialData: teachers,
  });

  const mutation = useMutation<unknown, unknown, number[]>({
    mutationFn: selectedItems =>
      Promise.all(selectedItems.map(id => deleteTeacher(id))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
    },
  });

  if (query.status === 'error') {
    return 'error';
  }

  return (
    <>
      <Head>
        <title>Админ - преподаватели</title>
      </Head>
      <Layout>
        <Container>
          <AdminSidebar />
          <Table
            title="Преподаватели"
            heads={['Имя', 'Фамилия', 'Отчество', 'Предметы']}
            editableRaw={<EditTeacher />}
            onDelete={selectedItems => mutation.mutate(selectedItems)}
          >
            {query.data.map(teacher => (
              <TableRow key={teacher.id} id={teacher.id}>
                <TableData>{teacher.firstName}</TableData>
                <TableData>{teacher.lastName}</TableData>
                <TableData>{teacher.patronymic}</TableData>
                <TableData>
                  {teacher.subjects
                    .map(({ subject }) => subject.name)
                    .toString()}
                </TableData>
              </TableRow>
            ))}
          </Table>
        </Container>
      </Layout>
    </>
  );
}

function EditTeacher() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const { data: subjects, status } = useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjects,
  });

  const { mutate } = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries(['teachers']);
      close();
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

const TeacherSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().min(1),
  subjects: z.array(z.number()),
});
