import AdminNav from '../../../components/layout/AdminNav';
import Layout from '../../../components/layout/Layout';

export default function Changes() {
  return (
    <Layout>
      <AdminNav />
      <div className="grid flex-1 grid-cols-4 gap-3">
        <div>
          <div>
            <h6>Группа</h6>
            <table>
              <tbody>
                <tr>
                  <th>№</th>
                  <th>Предмет</th>
                  <th>Кабинет</th>
                </tr>
                <tr>
                  <td>0</td>
                  <td>Математика</td>
                  <td>321</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
