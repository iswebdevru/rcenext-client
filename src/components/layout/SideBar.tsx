'use client';

import classNames from 'classnames';
import { PropsWithChildren, useState } from 'react';

interface SideBarProps {
  title: string;
  className?: string;
}

export default function SideBar({
  children,
  title,
  className,
}: PropsWithChildren<SideBarProps>) {
  const [opened, setOpened] = useState(false);

  return (
    <aside
      className={classNames({
        [className ? className : '']: className,
        'z-40 p-3 fixed w-full h-[80vh] left-0 transition-[top] sm:sticky sm:left-auto sm:top-[calc(var(--header-height)+1rem)] bg-zinc-100 bg-opacity-95 dark:bg-zinc-900 dark:bg-opacity-95 sm:bg-transparent sm:p-0 sm:w-auto sm:h-[calc(100vh-var(--header-height)-2rem)] shrink-0 grow-1':
          true,
        'top-[20vh]': opened,
        'top-[calc(100vh-82px)]': !opened,
      })}
    >
      <div className="sticky top-0 z-10 mb-4 sm:hidden">
        <button
          aria-label="Reveal sidebar"
          className="flex flex-col items-center w-full py-2 border rounded-md common-border component-bg"
          onClick={() => setOpened(prev => !prev)}
        >
          <span className="mb-2 text-lg font-bold common-text">{title}</span>
          <span className="block w-8 h-1 rounded-md bg-neutral-800 dark:bg-neutral-200"></span>
        </button>
      </div>
      <div className="common-scrollbar overflow-auto h-[calc(80vh-98px)] sm:h-full">
        {children}
      </div>
    </aside>
  );
}
