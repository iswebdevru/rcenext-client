import { PropsWithChildren } from 'react';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="pt-[calc(var(--header-height)+1rem)] px-3 pb-4 flex items-start gap-4 w-full max-w-screen-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}
