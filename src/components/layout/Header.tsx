import Link, { LinkProps } from 'next/link';
import Logo from '../icons/Logo';
import ThemeButton from '../features/ThemeButton';
import { PropsWithChildren } from 'react';

const HeaderLink = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      {...props}
      className="transition-colors font-medium text-sm text-zinc-700 hover:text-accent-600 dark:text-zinc-100 dark:hover:text-accent-500"
    />
  );
};

export default function Header() {
  return (
    <header className="fixed bottom-0 left-0 top-0 right-0 z-50 h-[var(--header-height)] transition-colors border-b common-border component-bg">
      <div className="h-full max-w-screen-2xl mx-auto px-3 flex flex-row items-center gap-40">
        <Link href="/" className="group">
          <Logo />
        </Link>
        <div className="flex flex-row items-center justify-between flex-1">
          <nav>
            <ul className="flex gap-8 text-sm flex-row">
              <li>
                <HeaderLink href="/admin">Админ</HeaderLink>
              </li>
              <li>
                <HeaderLink href="/admin">Админ</HeaderLink>
              </li>
              <li>
                <HeaderLink href="/admin">Админ</HeaderLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center">
            <ThemeButton />
          </div>
        </div>
      </div>
    </header>
  );
}
