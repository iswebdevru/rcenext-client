import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import Table, {
  EditableRaw,
  TableData,
  TableDataSmall,
  TableRow,
} from '../../components/features/Table';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Container from '../../components/layout/Container';
import Layout from '../../components/layout/Layout';

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  subjects: number[];
}

interface EditableTeacher extends Omit<Teacher, 'id'> {
  id: number | null;
}

const EditTeacher: EditableRaw = ({ id }) => {
  const [teacher, setTeacher] = useState<EditableTeacher | null>(
    id === null
      ? {
          id,
          firstName: '',
          lastName: '',
          patronymic: '',
          subjects: [],
        }
      : null
  );

  const handleInputTextFactory =
    (field: keyof EditableTeacher) => (e: ChangeEvent<HTMLInputElement>) => {
      if (teacher) {
        setTeacher({ ...teacher, [field]: e.currentTarget.value });
      }
    };

  return (
    <tr className="transition-colors border-b common-border">
      <TableDataSmall>
        <div className="w-5 h-5 bg-black"></div>
      </TableDataSmall>
      <TableData>
        <input
          type="text"
          value={teacher?.firstName}
          onChange={handleInputTextFactory('firstName')}
        />
      </TableData>
      <TableData>
        <input
          type="text"
          value={teacher?.lastName}
          onChange={handleInputTextFactory('lastName')}
        />
      </TableData>
      <TableData>
        <input
          type="text"
          value={teacher?.patronymic}
          onChange={handleInputTextFactory('patronymic')}
        />
      </TableData>
      <TableData>to be implemented...</TableData>
      <TableDataSmall>
        <button>Cancel</button>
      </TableDataSmall>
    </tr>
  );
};

export default function Teachers() {
  const teachers: Teacher[] = [
    {
      id: 1,
      firstName: 'Александр',
      lastName: 'Тюринов',
      patronymic: 'Дмитриевич',
      subjects: [],
    },
  ];

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
          >
            {teachers.map(teacher => (
              <TableRow key={teacher.id} id={teacher.id}>
                <TableData>{teacher.firstName}</TableData>
                <TableData>{teacher.lastName}</TableData>
                <TableData>{teacher.patronymic}</TableData>
                <TableData>{teacher.subjects.toString()}</TableData>
              </TableRow>
            ))}
          </Table>
        </Container>
      </Layout>
    </>
  );
}
