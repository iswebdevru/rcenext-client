import Link from 'next/link';
import Logo from '../icons/Logo';
import ThemeButton from '../features/ThemeButton';

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
              <li className="font-medium hover:text-violet-500">
                <Link href="/admin">Админ</Link>
              </li>
              <li className="font-medium hover:text-violet-500">Second</li>
              <li className="font-medium hover:text-violet-500">Third</li>
              <li className="font-medium hover:text-violet-500">Fourth</li>
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
