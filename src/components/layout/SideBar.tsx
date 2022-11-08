import { PropsWithChildren } from 'react';

export default function SideBar({ children }: PropsWithChildren) {
  return (
    <aside className="transition-colors sticky top-20 h-[calc(100vh-104px)] max-w-xs rounded-md border common-border shrink-0 bg-zinc-100 dark:bg-zinc-800 ">
      {children}
    </aside>
  );
}
