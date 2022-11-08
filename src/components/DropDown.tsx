'use client';

import classNames from 'classnames';
import React, {
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface Option {
  id: number | null;
  value: string | number;
}

export interface DropDownProps {
  options: Option[];
  active: Option['id'];
  setActive: (optionId: number | null) => void;
  defaultValue?: string | number;
}

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

export default function DropDown({
  options,
  setActive,
  active,
  defaultValue = '-',
}: DropDownProps) {
  const [searchText, setSearchText] = useState<string | number>(
    options.find(o => o.id === active)?.value || defaultValue
  );
  const [showOptions, setShowOptions] = useState(false);
  const [shouldSort, setShouldSort] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectFactory = (id: number | null) => () => {
    setActive(id);
    setSearchText(options.find(o => o.id === id)?.value || defaultValue);
    setShowOptions(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSearchText(event.currentTarget.value);
    setShouldSort(true);
    const selectedOption = options.find(
      option => option.value === event.currentTarget.value
    );
    if (selectedOption) {
      setActive(selectedOption.id);
    } else if (active !== null) {
      setActive(null);
    }
  };

  const handleKeyDownFactory =
    (id: number | null) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter') {
        handleSelectFactory(id)();
      }
    };

  const defaultOption = useMemo(
    () => ({ id: null, value: defaultValue }),
    [defaultValue]
  );

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
      ? options.sort((a, b) =>
          sortByMostAccurate(
            searchText.toString(),
            a.value.toString(),
            b.value.toString()
          )
        )
      : options),
  ];

  const height = showOptions
    ? options.length < 5
      ? options.length * 36
      : 207
    : 0;

  return (
    <div className="relative" ref={dropDownRef}>
      <input
        type="search"
        className="h-9 transition-[outline,background] duration-75 outline outline-1 common-outline common-focus common-text bg-zinc-50 w-full px-4 text-sm rounded-md mb-2 dark:bg-zinc-800"
        value={searchText}
        onChange={handleChange}
        onFocus={() => setShowOptions(true)}
      />
      <div
        className="top-full left-0 right-0 absolute z-10 outline-1 transition-[height] outline-none common-outline -outline-offset-1 rounded-md origin-top"
        style={{ height }}
      >
        <ul
          className="overflow-auto transition-[height] rounded-md duration-200 common-scrollbar"
          style={{ height }}
        >
          {optionsWithDefault.map(({ id, value }, index) => (
            <li key={id}>
              <button
                className={classNames({
                  'w-full text-left text-sm common-text select-none h-9 px-4 transition':
                    true,
                  'bg-violet-100 hover:bg-violet-100 dark:bg-violet-800':
                    active === id,
                  'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700':
                    active !== id,
                  'border-t common-border': index !== 0,
                })}
                onClick={handleSelectFactory(id)}
                onKeyDown={handleKeyDownFactory(id)}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
