import Link from 'next/link';
// import { useState } from 'react';
import Logo from '../icons/Logo';
import ThemeButton from '../features/ThemeButton';

export default function Header() {
  // const [opened, setOpened] = useState(false);

  return (
    <header className="fixed bottom-0 left-0 top-0 right-0 z-50 sm:h-14 transition-colors border-b common-border component-bg text-black dark:text-white">
      <div className="max-w-7xl h-full px-4 mx-auto flex flex-col sm:flex-row items-center gap-40">
        <Link href="/" className="group">
          <Logo />
        </Link>
        <div className="flex flex-col sm:flex-row items-center justify-between flex-1">
          <nav>
            <ul className="flex flex-col sm:flex-row gap-8">
              <li className="font-semibold hover:text-violet-500">
                <Link href="/admin">Админ</Link>
              </li>
              <li className="font-semibold hover:text-violet-500">Second</li>
              <li className="font-semibold hover:text-violet-500">Third</li>
              <li className="font-semibold hover:text-violet-500">Fourth</li>
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
