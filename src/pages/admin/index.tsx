import Head from 'next/head';
import AdminNav from '../../components/layout/AdminNav';
import Layout from '../../components/layout/Layout';

export default function Admin() {
  return (
    <>
      <Head>
        <title>Админ</title>
      </Head>
      <Layout>
        <AdminNav />
      </Layout>
    </>
  );
}
