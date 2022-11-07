import classNames from 'classnames';

interface TabsProps {
  active: number;
  items: (string | number)[];
  setActive: (active: number) => void;
}

export default function Tabs({ active, items, setActive }: TabsProps) {
  const handleClickFactory = (index: number) => () => {
    setActive(index);
  };

  return (
    <div className="transition-colors rounded-md bg-zinc-200 dark:bg-zinc-700">
      <ul className="border-2 border-zinc-200 transition-colors flex rounded-md flex-wrap overflow-hidden gap-[2px] dark:border-zinc-700">
        {items.map((item, index) => (
          <li key={index} className="flex-1">
            <button
              onClick={handleClickFactory(index)}
              className={classNames({
                'w-full text-sm text-neutral-800 px-2 py-1 transition-colors dark:text-neutral-100':
                  true,
                'bg-violet-200 dark:bg-violet-700': index === active,
                'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700':
                  index !== active,
              })}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
