import Schedule from '../../../components/features/Schedule';
import AdminNav from '../../../components/layout/AdminNav';
import Layout from '../../../components/layout/Layout';
import SideBar from '../../../components/layout/SideBar';

export default function Changes() {
  return (
    <Layout>
      <AdminNav />
      <div className="flex-1">
        <div></div>
        <div className="grid grid-cols-4 gap-3">
          <Schedule />
          <Schedule />
          <Schedule />
          <Schedule />
          <Schedule />
          <Schedule />
        </div>
      </div>
      <SideBar title="Фильтры">фыва</SideBar>
    </Layout>
  );
}
