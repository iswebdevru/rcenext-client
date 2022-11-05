import Link from 'next/link';
import ThemeButton from './ThemeButton';

export default function Header() {
  return (
    <header className="border-b border-zinc-200 text-gray-700 dark:text-gray-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl px-2 py-4 mx-auto flex items-center gap-32">
        <Link href="/" className="font-semibold">
          RCE Next
        </Link>
        <div className="flex items-center justify-between flex-1">
          <nav>
            <ul className="flex gap-8">
              <li className="font-semibold">First</li>
              <li className="font-semibold">Second</li>
              <li className="font-semibold">Third</li>
              <li className="font-semibold">Fourth</li>
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
