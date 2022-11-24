import { useState } from 'react';
import { Calendar } from '../components/features/Calendar';
import Search from '../components/common/Search';
import SideBar from '../components/layout/SideBar';
import Tabs from '../components/common/Tabs';
import Select, { Option } from '../components/common/Select';
import Layout from '../components/layout/Layout';
import Head from 'next/head';

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
  const [activeBlock, setActiveBlock] = useState<number>(1);

  return (
    <Layout>
      <Head>
        <title>РКЭ Next</title>
      </Head>
      <SideBar title="Фильтры">
        <div className="mb-4">
          <Calendar date={date} setDate={setDate} />
        </div>
        <div className="component-bg border common-border rounded-md p-3">
          <div className="mb-3">
            <Search
              text={searchText}
              setText={setSearchText}
              placeholder="Искать по группе"
            />
          </div>
          <div className="mb-3">
            <Tabs
              items={SCHEDULE_TYPES}
              active={activeTab}
              setActive={setActiveTab}
            />
          </div>
          <Select active={activeBlock} setActive={setActiveBlock}>
            {BLOCKS.map(block => (
              <Option
                key={block.id}
                id={block.id}
                value={block.value.toString()}
              />
            ))}
          </Select>
        </div>
      </SideBar>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 flex-1"></div>
    </Layout>
  );
}
