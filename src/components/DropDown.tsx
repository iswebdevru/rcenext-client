'use client';

import { ChangeEventHandler, useState } from 'react';

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

  const sortedOptions = options.sort((a, b) => {
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
  });

  return (
    <div className="border w-56 rounded-md overflow-hidden">
      <input
        type="text"
        className="bg-gray-50 outline-1 outline-none outline-offset-0 outline-gray-200 w-full p-3 focus:bg-gray-100"
        value={searchText}
        onChange={handleChange}
      />
      <ul className="max-h-72 overflow-auto">
        <li
          className={`cursor-pointer border-t p-3 transition ${
            selected === null ? 'bg-red-50 hover:bg-red-50' : 'hover:bg-gray-50'
          }`}
          onClick={handleClickFactory(null)}
        >
          -
        </li>
        {sortedOptions.map(({ id, value }) => (
          <li
            className={`cursor-pointer border-t p-3 transition ${
              selected === id
                ? 'bg-green-50 hover:bg-green-50'
                : 'hover:bg-gray-50'
            }`}
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
