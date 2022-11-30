import Link, { LinkProps } from 'next/link';
import Logo from '../icons/Logo';
import ThemeButton from '../features/ThemeButton';
import { PropsWithChildren, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <header className="fixed left-0 top-0 right-0 z-50 h-[var(--header-height)] transition-colors border-b common-border component-bg">
      <div className="flex flex-row items-center justify-between h-full gap-40 px-3 mx-auto sm:justify-start max-w-screen-2xl">
        <Link href="/" className="group">
          <Logo />
        </Link>
        <div className="flex flex-row items-center justify-between gap-4 sm:flex-1">
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-10">
              <HeaderLinks />
            </ul>
          </nav>
          <ThemeButton />
          <button className="sm:hidden" onClick={() => setIsOpened(true)}>
            <FontAwesomeIcon icon={faBars} fixedWidth size="2x" />
          </button>
        </div>
      </div>
      <div
        className={classNames({
          'transition block sm:hidden fixed top-0 bottom-0 left-0 right-0 bg-zinc-900 dark:bg-black ':
            true,
          'pointer-events-auto bg-opacity-25 backdrop-blur-[1px] dark:bg-opacity-25':
            isOpened,
          'pointer-events-none bg-opacity-0 dark:bg-opacity-0': !isOpened,
        })}
        onClick={e => {
          if (e.currentTarget === e.target) {
            setIsOpened(false);
          }
        }}
      >
        <div
          className={classNames({
            'w-2/3 h-full component-bg transition': true,
            'translate-x-0': isOpened,
            '-translate-x-full': !isOpened,
          })}
        >
          <nav>
            <ul>
              <HeaderLinks />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function HeaderLinks() {
  return (
    <>
      <li>
        <HeaderLink href="/admin">Админ</HeaderLink>
      </li>
      <li>
        <HeaderLink href="/admin">Админ</HeaderLink>
      </li>
      <li>
        <HeaderLink href="/admin">Админ</HeaderLink>
      </li>
    </>
  );
}

const HeaderLink = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      {...props}
      className="text-sm font-medium transition-colors text-zinc-700 hover:text-accent-600 dark:text-zinc-100 dark:hover:text-accent-500"
    />
  );
};
