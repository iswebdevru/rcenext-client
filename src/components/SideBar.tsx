'use client';

import { useState } from 'react';
import { Calendar } from './Calendar';

export default function SideBar() {
  const [date, setDate] = useState(new Date());

  return (
    <aside className="transition-colors sticky top-20 h-[calc(100vh-104px)] rounded-md border border-zinc-200 bg-zinc-100 shrink-0 dark:bg-zinc-800 dark:border-zinc-700">
      <div className="p-2">
        <Calendar date={date} setDate={setDate} />
      </div>
      <hr />
      <div>
        <input type="search" placeholder="Группа" />
      </div>
      <hr />
      <div>
        <button>Смешанное</button>
        <button>Основное</button>
        <button>Изменения</button>
      </div>
    </aside>
  );
}
