import classNames from 'classnames';
import React, {
  ChangeEventHandler,
  Children,
  cloneElement,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

interface SelectPropsOne {
  type?: 'one';
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

interface SelectPropsMany {
  type: 'many';
  active: number[];
  setActive: Dispatch<SetStateAction<number[]>>;
}

export type SelectProps = (SelectPropsOne | SelectPropsMany) &
  PropsWithChildren;

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

export default function Select(props: SelectProps) {
  const defaultText = 'Выбрать';
  const [searchText, setSearchText] = useState<string>(defaultText);
  const [showOptions, setShowOptions] = useState(false);
  const [sortedChildren, setSortedChildren] = useState(
    props.children as ReactElement<OptionProps>[]
  );
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setSearchText(event.currentTarget.value);
    if (event.currentTarget.value === '') {
      setSortedChildren(props.children as any);
    } else {
      setSortedChildren(prev =>
        [...prev].sort((a, b) =>
          sortByMostAccurate(searchText, a.props.value, b.props.value)
        )
      );
    }
  };

  const onClose = () => {
    setSearchText(defaultText);
  };

  // Handle outside click
  useEffect(() => {
    document.body.addEventListener('mousedown', event => {
      if (!dropDownRef.current?.contains(event.target as Node)) {
        setShowOptions(false);
      }
    });
  }, []);

  const count = Children.count(props.children);
  const height = showOptions ? (count < 5 ? count * 36 : 207) : 0;
  return (
    <div className="relative" ref={dropDownRef}>
      <input
        type="search"
        className="h-9 transition-[outline,background] duration-75 outline outline-1 common-outline common-focus common-text bg-zinc-50 w-full px-4 text-sm rounded-md dark:bg-zinc-800"
        value={searchText}
        onChange={handleChange}
        onFocus={() => {
          setShowOptions(true), setSearchText('');
        }}
        onBlur={onClose}
      />
      <div
        className={classNames({
          'absolute transition-[padding] top-full left-0 right-0': true,
          'py-4': showOptions,
        })}
      >
        <div
          className="z-10 outline-1 transition-[height] outline-none common-outline -outline-offset-1 rounded-md origin-top"
          style={{ height }}
        >
          <ul
            className="overflow-auto transition-[height] rounded-md duration-200 common-scrollbar"
            style={{ height }}
          >
            {sortedChildren.map((option, i) => {
              return (
                <li key={option.props.id}>
                  {cloneElement(option, {
                    _index: i,
                    _parentProps: props,
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface OptionProps {
  id: number;
  value: string;
  _index?: number;
  _parentProps?: SelectProps;
}

export function Option(props: OptionProps) {
  const parentProps = props._parentProps!;
  const handleSelect = () => {
    if (parentProps.type === 'many') {
      parentProps.setActive(prev => {
        if (prev.includes(props.id)) {
          return prev.filter(currentId => currentId !== props.id);
        }
        return [...prev, props.id];
      });
    } else {
      parentProps.setActive(props.id);
    }
    // setShowOptions(false);
  };
  const handleKeyDownFactory = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === 'Enter') {
      handleSelect();
    }
  };
  return (
    <button
      className={classNames({
        'w-full text-left text-sm common-text select-none h-9 px-4 transition':
          true,
        'bg-violet-100 hover:bg-violet-100 dark:bg-violet-800': Array.isArray(
          parentProps.active
        )
          ? parentProps.active.includes(props.id)
          : parentProps.active === props.id,
        'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700':
          Array.isArray(parentProps.active)
            ? !parentProps.active.includes(props.id)
            : parentProps.active !== props.id,
        'border-t common-border': props._index !== 0,
      })}
      onClick={handleSelect}
      onKeyDown={handleKeyDownFactory}
    >
      {props.value}
    </button>
  );
}
