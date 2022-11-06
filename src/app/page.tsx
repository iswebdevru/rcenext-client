'use client';

import { useState } from 'react';
import DropDown from '../components/DropDown';
import Schedule from '../components/Schedule';
import SideBar from '../components/SideBar';

export default function Index() {
  const options = [
    { id: 1, value: 'ИС-203' },
    { id: 2, value: 'ИС-103' },
    { id: 3, value: 'ИС-302' },
    { id: 4, value: 'ССА-104' },
    { id: 5, value: 'ТО-234' },
    { id: 6, value: 'ИБ-234' },
    { id: 7, value: 'ПНГ-234' },
  ];
  const [selectedId, setSelectedId] = useState<null | number>(null);

  return (
    <div className="mt-20 px-4 mx-auto flex max-w-7xl gap-6 items-start">
      <SideBar />
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
