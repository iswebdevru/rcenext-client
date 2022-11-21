import Link from 'next/link';
import { PropsWithChildren } from 'react';
import SideBar from './SideBar';

interface AdminLink {
  href: string;
}

function AdminLink({ href, children }: PropsWithChildren<AdminLink>) {
  return (
    <Link
      href={href}
      className="group transition-colors flex px-3 py-2 w-full rounded-lg items-center gap-3 hover:bg-violet-100 dark:hover:bg-violet-700"
    >
      <span className="block w-5 h-5 bg-black dark:bg-gray-400"></span>
      <span className="transition-colors text-black font-semibold group-hover:text-violet-900 dark:text-neutral-400 dark:group-hover:text-violet-50">
        {children}
      </span>
    </Link>
  );
}

export default function AdminSidebar() {
  return (
    <SideBar title="Навигация">
      <nav className="px-6 py-8">
        <ul>
          <li className="mb-4 last:mb-0">
            <h6 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-300">
              Расписание
            </h6>
            <ul className="flex flex-col">
              <li className="mb-1 last:mb-0">
                <AdminLink href="/admin/schedule/base">Основное</AdminLink>
              </li>
              <li className="mb-1 last:mb-0">
                <AdminLink href="/admin/schedule/changes">Изменения</AdminLink>
              </li>
            </ul>
          </li>
          <li className="mb-4 last:mb-0">
            <h6 className="mb-3 font-semibold text-neutral-900 dark:text-neutral-300">
              Общее
            </h6>
            <ul className="flex flex-col">
              <li className="mb-1 last:mb-0">
                <AdminLink href="/admin/teachers">Преподаватели</AdminLink>
              </li>
              <li className="mb-1 last:mb-0">
                <AdminLink href="/admin/subjects">Предметы</AdminLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </SideBar>
  );
}
