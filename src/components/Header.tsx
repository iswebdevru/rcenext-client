import Link from 'next/link';
import ThemeButton from './ThemeButton';

export default function Header() {
  return (
    <header className="fixed left-0 top-0 right-0 z-50 h-14 transition-colors border-b border-b-zinc-200 bg-zinc-100 text-black dark:text-white dark:border-zinc-700 dark:bg-zinc-800">
      <div className="max-w-7xl h-full px-4 mx-auto flex items-center gap-40">
        <Link href="/" className="font-semibold hover:text-violet-500">
          RCE Next
        </Link>
        <div className="flex items-center justify-between flex-1">
          <nav>
            <ul className="flex gap-8">
              <li className="font-semibold hover:text-violet-500">First</li>
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
