import {
  faBook,
  faCalendarDays,
  faCalendarPlus,
  faUserGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export const AdminLink = (props: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      {...props}
      className="flex items-center gap-3 py-2 pl-3 transition-colors rounded-md pr-9 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 hover:dark:text-zinc-200 hover:dark:bg-zinc-800"
    />
  );
};

export default function AdminNav() {
  return (
    <nav className="sticky p-3">
      <ul className="flex flex-col gap-1">
        <li>
          <AdminLink href="/admin/schedule/base">
            <FontAwesomeIcon icon={faCalendarDays} fixedWidth />
            <span className="text-sm font-semibold tracking-wider">
              Основное расписание
            </span>
          </AdminLink>
        </li>
        <li>
          <AdminLink href="/admin/schedule/changes">
            <FontAwesomeIcon icon={faCalendarPlus} fixedWidth />
            <span className="text-sm font-semibold tracking-wider">
              Изменения
            </span>
          </AdminLink>
        </li>
        <li>
          <AdminLink href="/admin/teachers">
            <FontAwesomeIcon icon={faUsers} fixedWidth />
            <span className="text-sm font-semibold tracking-wider">
              Преподаватели
            </span>
          </AdminLink>
        </li>
        <li>
          <AdminLink href="/admin/groups">
            <FontAwesomeIcon icon={faUserGroup} fixedWidth />
            <span className="text-sm font-semibold tracking-wider">Группы</span>
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
