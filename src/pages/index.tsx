import { useState } from 'react';
import { Calendar } from '../components/common/Calendar';
import Search from '../components/Search';
import SideBar from '../components/layout/SideBar';
import Tabs from '../components/common/Tabs';
import DropDown from '../components/common/DropDown';
import Layout from '../components/layout/Layout';
import Head from 'next/head';
import Container from '../components/layout/Container';

const SCHEDULE_TYPES = ['Смешанное', 'Основное', 'Изменения'];
const BLOCKS = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 4,
    value: 4,
  },
  {
    id: 5,
    value: 5,
  },
  {
    id: 6,
    value: 6,
  },
];

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [activeBlock, setActiveBlock] = useState<null | number>(null);

  return (
    <Layout>
      <Head>
        <title>РКЭ Next</title>
      </Head>
      <Container>
        <SideBar title="Фильтры">
          <div className="p-4">
            <Calendar date={date} setDate={setDate} />
          </div>
          <hr className="common-border transition-colors mb-4" />
          <div className="px-4 py-2">
            <Search text={searchText} setText={setSearchText} />
          </div>
          <div className="px-4 py-2">
            <Tabs
              items={SCHEDULE_TYPES}
              active={activeTab}
              setActive={setActiveTab}
            />
          </div>
          <div className="px-4 py-2">
            <DropDown
              options={BLOCKS}
              active={activeBlock}
              setActive={setActiveBlock}
              defaultValue="Все"
            />
          </div>
        </SideBar>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 flex-1"></div>
      </Container>
    </Layout>
  );
}
