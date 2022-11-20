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
    <div className="transition-colors rounded-md bg-white dark:bg-zinc-700">
      <ul className="border common-border transition-colors flex rounded-md flex-wrap overflow-hidden">
        {items.map((item, index) => (
          <li key={index} className="flex-1">
            <button
              onClick={handleClickFactory(index)}
              className={classNames({
                'w-full text-sm px-2 py-1 transition-colors': true,
                'bg-violet-400 text-white dark:text-readable-200 dark:bg-violet-700':
                  index === active,
                'text-readable-700 hover:bg-zinc-100 dark:text-readable-200 dark:bg-zinc-800 dark:hover:bg-zinc-700':
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
