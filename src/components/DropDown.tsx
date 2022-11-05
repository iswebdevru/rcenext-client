'use client';

import classNames from 'classnames';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';

export interface Option {
  id: number | null;
  value: string;
}

export interface DropDownProps {
  options: Option[];
  selected: Option['id'];
  select: (optionId: number | null) => void;
}

const defaultOption: Option = {
  id: null,
  value: '-',
};

function sortByMostAccurate(searchText: string, a: string, b: string) {
  const searchLower = searchText.toLowerCase();
  const aMatch = a.toLowerCase().startsWith(searchLower);
  const bMatch = b.toLowerCase().startsWith(searchLower);
  if (aMatch && bMatch) {
    return a.length - b.length;
  } else if (!aMatch && bMatch) {
    return 1;
  } else if (aMatch && !bMatch) {
    return -1;
  }
  return 0;
}

export default function DropDown({ options, select, selected }: DropDownProps) {
  const [searchText, setSearchText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [shouldSort, setShouldSort] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectFactory = (id: number | null) => () => {
    select(id);
    setSearchText(options.find(o => o.id === id)?.value || '');
    setShowOptions(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSearchText(event.currentTarget.value);
    setShouldSort(true);
    const selectedOption = options.find(
      option => option.value === event.currentTarget.value
    );
    if (selectedOption) {
      select(selectedOption.id);
    } else if (selected !== null) {
      select(null);
    }
  };

  const handleKeyDownFactory =
    (id: number | null) => (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.key === 'Enter') {
        handleSelectFactory(id)();
      }
    };

  // Handle outside click
  useEffect(() => {
    document.body.addEventListener('mousedown', event => {
      if (!dropDownRef.current?.contains(event.target as Node)) {
        setShowOptions(false);
      }
    });
  }, []);

  useEffect(() => {
    setShouldSort(false);
  }, [searchText]);

  const optionsWithDefault = [
    defaultOption,
    ...(shouldSort
      ? options.sort((a, b) => sortByMostAccurate(searchText, a.value, b.value))
      : options),
  ];

  return (
    <div className="relative w-56" ref={dropDownRef}>
      <input
        type="text"
        className="border bg-gray-50 w-full p-3 focus:bg-gray-100 outline-0"
        value={searchText}
        onChange={handleChange}
        onFocus={() => setShowOptions(true)}
      />
      <div
        className={classNames({
          'top-full left-0 right-0 absolute duration-300 transition-[height] origin-top overflow-auto border-x bg-white scrollbar-thumb-gray-200 scrollbar-thin scrollbar-track-gray-50 hover:scrollbar-thumb-gray-300':
            true,
          'h-0 border-0': !showOptions,
          'h-72  border-b': showOptions,
        })}
      >
        <ul>
          {optionsWithDefault.map(({ id, value }) => (
            <li
              className={classNames({
                'cursor-pointer select-none border-t p-3 transition': true,
                'bg-emerald-100 hover:bg-emerald-100': selected === id,
                'hover:bg-gray-50': selected !== id,
              })}
              key={id}
              tabIndex={0}
              onClick={handleSelectFactory(id)}
              onKeyDown={handleKeyDownFactory(id)}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
