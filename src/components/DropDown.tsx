'use client';

import classNames from 'classnames';
import { ChangeEventHandler, useEffect, useId, useState } from 'react';

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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shouldSort, setShouldSort] = useState(false);
  const id = useId();

  const handleClickFactory = (id: number | null) => () => {
    select(id);
    setSearchText(options.find(o => o.id === id)?.value || '');
    setShowSuggestions(false);
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

  const sortedOptions = shouldSort
    ? options.sort((a, b) => {
        const search = searchText.toLowerCase();
        const aMatch = a.value.toLowerCase().startsWith(search);
        const bMatch = b.value.toLowerCase().startsWith(search);
        if (aMatch && bMatch) {
          return a.value.length - b.value.length;
        } else if (!aMatch && bMatch) {
          return 1;
        } else if (aMatch && !bMatch) {
          return -1;
        }
        return 0;
      })
    : options;

  useEffect(() => {
    document.body.addEventListener('click', event => {
      const el = (event.target as Element)?.closest(`[data-id="${id}"]`);
      const elWithFocus = document.activeElement?.closest(`[data-id="${id}"]`);
      if (!el && !elWithFocus) {
        setShowSuggestions(false);
      }
    });
  }, []);

  useEffect(() => {
    setShouldSort(false);
  }, [searchText]);

  return (
    <div className="relative w-56" data-id={id}>
      <input
        type="text"
        className="border bg-gray-50 w-full p-3 focus:bg-gray-100 outline-0"
        value={searchText}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
      />
      <div
        className={classNames({
          'top-full left-0 right-0 absolute duration-300 transition-[height] origin-top overflow-auto border-x bg-white':
            true,
          'h-0 border-0': !showSuggestions,
          'h-72  border-b': showSuggestions,
        })}
      >
        <ul>
          <li
            className={classNames({
              'cursor-pointer border-t p-3 transition': true,
              'bg-red-50 hover:bg-red-50': selected === null,
              'hover:bg-gray-50': selected !== null,
            })}
            onClick={handleClickFactory(null)}
          >
            -
          </li>
          {sortedOptions.map(({ id, value }) => (
            <li
              className={classNames({
                'cursor-pointer border-t p-3 transition': true,
                'bg-green-50 hover:bg-green-50': selected === id,
                'hover:bg-gray-50': selected !== id,
              })}
              key={id}
              onClick={handleClickFactory(id)}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
