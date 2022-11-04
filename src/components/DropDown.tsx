'use client';

import { ChangeEventHandler, ReactNode, useEffect, useState } from 'react';

export interface Option {
  id: number;
  value: string;
}

export interface DropDownProps {
  options: Option[];
  selected: number | null;
  select: (optionId: number | null) => void;
}

export default function DropDown({ options, select, selected }: DropDownProps) {
  const [searchText, setSearchText] = useState('');

  const handleClickFactory = (id: number | null) => () => {
    select(id);
    setSearchText(options.find(o => o.id === id)?.value || '');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSearchText(event.currentTarget.value);
    const selectedOption = options.find(
      option => option.value === event.currentTarget.value
    );
    if (selectedOption) {
      select(selectedOption.id);
    } else if (selected !== null) {
      select(null);
    }
  };

  return (
    <div className="border-2 border-blue-900 w-56">
      <input
        type="text"
        className="border-2 border-blue-900"
        value={searchText}
        onChange={handleChange}
      />
      <ul>
        <li className="cursor-pointer" onClick={handleClickFactory(null)}>
          Не выбрано
        </li>
        {options
          .sort((a, b) => {
            const aMatch = a.value.startsWith(searchText);
            const bMatch = b.value.startsWith(searchText);
            if (aMatch && bMatch) {
              return a.value.length - b.value.length;
            } else if (!aMatch && bMatch) {
              return 1;
            } else if (aMatch && !bMatch) {
              return -1;
            }
            return 0;
          })
          .map(({ id, value }) => (
            <li
              className="cursor-pointer"
              key={id}
              onClick={handleClickFactory(id)}
            >
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
}
