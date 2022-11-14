import { PropsWithChildren } from 'react';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="mt-20 px-4 max-w-7xl mx-auto">{children}</div>
    </>
  );
}
