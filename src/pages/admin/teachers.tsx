import Head from 'next/head';
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react';
import Select, { Option } from '../../components/common/Select';
import Table, {
  EditableRaw,
  TableData,
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

function InputText(props: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      {...props}
      type="text"
      className="w-full min-w-0 transition-[outline] duration-75 outline outline-1 common-outline common-focus px-4 h-8 text-sm rounded-md"
    />
  );
}

const EditTeacher: EditableRaw = ({ id, cancel }) => {
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
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
    <tr className="transition-colors border-b common-border h-14">
      <td className="text-sm px-3 py-2">
        <div className="w-5 h-5 bg-black"></div>
      </td>
      <td className="text-sm px-3 py-2">
        <InputText
          value={teacher?.firstName}
          onChange={handleInputTextFactory('firstName')}
        />
      </td>
      <td className="text-sm px-3 py-2">
        <InputText
          value={teacher?.lastName}
          onChange={handleInputTextFactory('lastName')}
        />
      </td>
      <td className="text-sm px-3 py-2">
        <InputText
          value={teacher?.patronymic}
          onChange={handleInputTextFactory('patronymic')}
        />
      </td>
      <td className="text-sm px-3 py-2">
        <Select
          type="many"
          active={selectedSubjects}
          setActive={setSelectedSubjects}
        >
          <Option id={1} value="Математика" />
          <Option id={2} value="Русский язык" />
          <Option id={3} value="Информатика" />
        </Select>
      </td>
      <td className="text-sm px-3 py-2">
        <button className="w-5 h-5 bg-black" onClick={cancel}></button>
      </td>
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
