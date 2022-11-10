'use client';
import classNames from 'classnames';
import { PropsWithChildren, useState } from 'react';

interface SideBarProps {
  title: string;
}

export default function SideBar({
  children,
  title,
}: PropsWithChildren<SideBarProps>) {
  const [opened, setOpened] = useState(false);

  return (
    <aside
      className={classNames({
        'z-40 rounded-t-2xl fixed w-full left-0 transition-[top,background-color,border-color] sm:w-auto sm:sticky sm:left-auto sm:top-20 sm:max-w-xs sm:rounded-md border common-border shrink-0 bg-zinc-100 dark:bg-zinc-800':
          true,
        'top-[20vh]': opened,
        'top-[calc(100vh-57px)]': !opened,
      })}
    >
      <div className="sm:hidden sticky top-0 bg-zinc-100 dark:bg-zinc-800 border-b common-border z-10 rounded-t-2xl">
        <button
          aria-label="Reveal sidebar"
          className="flex items-center flex-col py-2 w-full"
          onClick={() => setOpened(prev => !prev)}
        >
          <span className="common-text font-bold text-lg mb-2">{title}</span>
          <span className="block w-8 h-1 bg-neutral-800 dark:bg-neutral-200 rounded-md"></span>
        </button>
      </div>
      <div className="h-[calc(80vh-57px)] common-scrollbar overflow-auto sm:h-[calc(100vh-106px)]">
        {children}
      </div>
    </aside>
  );
}
