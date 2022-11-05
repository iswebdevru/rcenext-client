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
    <div>
      <div className="mx-auto mt-4 max-w-xs">
        <DropDown
          options={options}
          select={setSelectedId}
          selected={selectedId}
        />
      </div>
    </div>
  );
}
