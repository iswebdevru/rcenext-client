import Head from 'next/head';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Container from '../../components/layout/Container';
import Layout from '../../components/layout/Layout';

export default function Admin() {
  return (
    <>
      <Head>
        <title>Админ</title>
      </Head>
      <Layout>
        <Container>
          <AdminSidebar />
        </Container>
      </Layout>
    </>
  );
}
