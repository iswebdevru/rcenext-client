import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export const AdminLink = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      {...props}
      className="transition-colors flex items-center gap-3 pl-3 pr-9 py-2 rounded-md text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 hover:dark:bg-zinc-800"
    />
  );
};

export default function AdminNav() {
  return (
    <nav className="sticky p-3">
      <h6 className="text-zinc-500 text-sm font-semibold mb-3">Админ панель</h6>
      <ul className="flex flex-col gap-1">
        <li>
          <AdminLink href="/admin/teachers">
            <FontAwesomeIcon icon={faUsers} fixedWidth />
            <span className="text-sm font-semibold tracking-wider">
              Преподаватели
            </span>
          </AdminLink>
        </li>
        <li>
          <AdminLink href="/admin/subjects">
            <FontAwesomeIcon icon={faBook} fixedWidth />
            <span className="text-sm font-semibold tracking-wider">
              Предметы
            </span>
          </AdminLink>
        </li>
      </ul>
    </nav>
  );
}
