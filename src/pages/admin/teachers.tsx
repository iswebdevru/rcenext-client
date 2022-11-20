import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import InputText from '../../components/common/InputText';
import Select, { Option } from '../../components/common/Select';
import Table, {
  EditableRaw,
  TableData,
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

const EditTeacher: EditableRaw = ({ id, close }) => {
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

  return (
    <tr className="transition-colors  border-b common-border h-14">
      <td className="text-sm px-3 py-2">
        <button className="w-5 h-5 bg-black" onClick={close}></button>
      </td>
      <td className="text-sm px-3 py-2">
        <InputText
          placeholder="Имя"
          pattern="[а-яА-Я\s]+"
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </td>
      <td className="text-sm px-3 py-2">
        <InputText
          placeholder="Фамилия"
          pattern="[а-яА-Я\s]+"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </td>
      <td className="text-sm px-3 py-2">
        <InputText
          placeholder="Отчество"
          pattern="[а-яА-Я\s]+"
          required
          value={patronymic}
          onChange={e => setPatronymic(e.target.value)}
        />
      </td>
      <td className="text-sm px-3 py-2">
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
      </td>
      <td className="text-sm px-3 py-2">
        <button className="w-5 h-5 bg-black" onClick={save}></button>
      </td>
    </tr>
  );
};

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
      console.log('here');

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
            EditableRaw={EditTeacher}
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
