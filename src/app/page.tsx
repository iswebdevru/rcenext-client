'use client';

import { useState } from 'react';
import DropDown from '../components/DropDown';

interface Group {
  id: number;
  name: string;
  index: number;
  course: number;
  block: number;
}

function groupToString({ name, index, course }: Group) {
  return `${name}-${course}${index < 10 ? `0${index}` : index}`;
}

export default function Home() {
  const options = [
    { id: 1, value: 'first' },
    { id: 2, value: 'second' },
    { id: 3, value: 'урожай' },
    { id: 4, value: 'урод' },
    { id: 5, value: 'умник' },
  ];
  const [selectedId, setSelectedId] = useState<null | number>(null);

  return (
    <div>
      <h1>Home</h1>
      <div>
        Selected value:{' '}
        {options.find(o => o.id === selectedId)?.value || 'Не выбрано'}
      </div>
      <DropDown
        options={options}
        select={setSelectedId}
        selected={selectedId}
      />
    </div>
  );
}
