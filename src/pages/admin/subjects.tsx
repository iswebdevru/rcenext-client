import Head from 'next/head';
import Container from '../../components/layout/Container';
import Layout from '../../components/layout/Layout';

export default function Subjects() {
  return (
    <>
      <Head>
        <title>Админ - предметы</title>
      </Head>
      <Layout>
        <Container>
          to be implemented
          {/* <AdminSidebar />
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
          </Table> */}
        </Container>
      </Layout>
    </>
  );
}
