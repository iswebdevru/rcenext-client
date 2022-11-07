'use client';

import { useState } from 'react';
import { Calendar } from '../components/Calendar';
import Schedule from '../components/Schedule';
import Search from '../components/Search';
import SideBar from '../components/SideBar';
import Tabs from '../components/Tabs';

const SCHEDULE_TYPES = ['Смешанное', 'Основное', 'Изменения'];

export default function Index() {
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [active, setActive] = useState(0);

  return (
    <div className="mt-20 px-4 mx-auto flex max-w-7xl gap-6 items-start">
      <SideBar>
        <div className="p-3">
          <Calendar date={date} setDate={setDate} />
        </div>
        <hr className="border-zinc-200 dark:border-zinc-700 transition-colors mb-3" />
        <div className="p-3">
          <Search text={text} setText={setText} />
        </div>
        <div className="p-3">
          <Tabs items={SCHEDULE_TYPES} active={active} setActive={setActive} />
        </div>
      </SideBar>
      <div className="grid gap-4 grid-cols-3 flex-1">
        <Schedule />
        <Schedule />
        <Schedule />
        <Schedule />
        <Schedule />
        <Schedule />
        <Schedule />
        <Schedule />
      </div>
    </div>
  );
}
