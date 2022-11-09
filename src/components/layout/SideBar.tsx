'use client';
import classNames from 'classnames';
import { PropsWithChildren, useState } from 'react';

export default function SideBar({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false);

  return (
    <aside
      className={classNames({
        'z-50 fixed h-[calc(100vh-112px)] rounded-2xl left-0 right-0 transition-[top,background-color] overflow-auto sm:common-scrollbar duration-300 sm:sticky sm:left-auto sm:right-auto sm:top-20 sm:h-[calc(100vh-104px)] sm:max-w-xs sm:rounded-md border common-border shrink-0 bg-zinc-100 dark:bg-zinc-800':
          true,
        'top-28 common-scrollbar': opened,
        'top-[calc(100vh-57px)] overflow-hidden': !opened,
      })}
    >
      <div className="sm:hidden sticky top-0 bg-zinc-100 dark:bg-zinc-800 border-b common-border z-10">
        <button
          aria-label="Reveal sidebar"
          className="flex items-center flex-col py-2 w-full"
          onClick={() => setOpened(prev => !prev)}
        >
          <span className="common-text font-bold text-lg mb-2">Фильтры</span>
          <span className="block w-8 h-1 bg-neutral-800 dark:bg-neutral-200 rounded-md"></span>
        </button>
      </div>
      <div>{children}</div>
    </aside>
  );
}
