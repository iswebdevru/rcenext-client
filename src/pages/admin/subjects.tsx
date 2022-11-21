import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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
import { shortTeacherName } from '../../lib/text-formatters';
import {
  createSubject,
  deleteSubject,
  getSubjects,
  getTeachers,
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
        <Container>
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
        </Container>
      </Layout>
    </>
  );
}

function EditSubject() {
  const [name, setName] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);

  const queryClient = useQueryClient();

  const { data: teachers, status } = useQuery({
    queryKey: ['teachers'],
    queryFn: getTeachers,
  });

  const { mutate } = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      queryClient.invalidateQueries(['subjects']);
    },
  });

  const { success: canSave } = SubjectSchema.safeParse({
    name,
    teachers: selectedTeachers,
  });

  const save = () => {
    mutate({
      name,
      teachers: selectedTeachers,
    });
  };

  return (
    <TableEditRaw canSave={canSave} onSave={save}>
      <TableData>
        <InputText value={name} onChange={e => setName(e.target.value)} />
      </TableData>
      <TableData>
        {status === 'success' ? (
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
