import { PropsWithChildren } from 'react';

export default function SideBar({ children }: PropsWithChildren) {
  return (
    <aside className="transition-colors sticky top-20 h-[calc(100vh-104px)] max-w-xs rounded-md border border-zinc-200 bg-zinc-100 shrink-0 dark:bg-zinc-800 dark:border-zinc-700">
      {children}
    </aside>
  );
}
