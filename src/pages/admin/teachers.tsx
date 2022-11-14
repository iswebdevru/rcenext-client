import Head from 'next/head';
import { Reducer, useReducer } from 'react';
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

interface EditableTeacherProps {
  teacher: Teacher;
}

function EditableTeacher(props: EditableTeacherProps) {
  return (
    <tr>
      <td>
        <input type="text" />
      </td>
    </tr>
  );
}

export default function Teachers() {
  const handleAddButton = () => {
    console.log('to be implemented');
  };

  return (
    <>
      <Head>
        <title>Админ - преподаватели</title>
      </Head>
      <Layout>
        <Container>
          <AdminSidebar />
          <div className="transition-colors grow self-stretch border rounded-md common-border component-bg">
            <div className="px-8 py-6">
              <h1 className="text-2xl font-bold mb-4">Преподаватели</h1>
              <div className="flex items-center">
                <input
                  type="search"
                  className="outline outline-1 px-4 py-1 rounded-md"
                />
                <div className="ml-auto flex items-center gap-4">
                  <button
                    className="bg-violet-500 px-4 py-2 font-semibold rounded-full text-sm text-white"
                    onClick={handleAddButton}
                  >
                    Добавить
                  </button>
                  <button className="bg-red-500 px-4 py-2 font-semibold rounded-full text-sm text-white">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
            <table className="w-full">
              <tbody>
                <tr className="transition-colors border-b common-border">
                  <th className="px-6 py-3 text-sm text-left">Имя</th>
                  <th className="px-6 py-3 text-sm text-left">Фамилия</th>
                  <th className="px-6 py-3 text-sm text-left">Отчество</th>
                  <th className="px-6 py-3 text-sm text-left">Предметы</th>
                </tr>
                <tr className="transition-colors border-b common-border">
                  <td className="px-6 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-3 text-sm">Имя</td>
                  <td className="px-6 py-3 text-sm">Фамилия</td>
                  <td className="px-6 py-3 text-sm">Отчество</td>
                  <td className="px-6 py-3 text-sm">Предметы</td>
                </tr>
                <tr className="transition-colors border-b common-border">
                  <td className="px-6 py-3 text-sm">Имя</td>
                  <td className="px-6 py-3 text-sm">Фамилия</td>
                  <td className="px-6 py-3 text-sm">Отчество</td>
                  <td className="px-6 py-3 text-sm">Предметы</td>
                </tr>
                <tr className="transition-colors border-b common-border">
                  <td className="px-6 py-3 text-sm">Имя</td>
                  <td className="px-6 py-3 text-sm">Фамилия</td>
                  <td className="px-6 py-3 text-sm">Отчество</td>
                  <td className="px-6 py-3 text-sm">Предметы</td>
                </tr>
                <tr className="transition-colors border-b common-border">
                  <td className="px-6 py-3 text-sm">Имя</td>
                  <td className="px-6 py-3 text-sm">Фамилия</td>
                  <td className="px-6 py-3 text-sm">Отчество</td>
                  <td className="px-6 py-3 text-sm">Предметы</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </Layout>
    </>
  );
}
