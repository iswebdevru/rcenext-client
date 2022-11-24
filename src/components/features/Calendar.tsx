import classNames from 'classnames';
import {
  getDaysForCalendarPage,
  getMonth,
  nextMonth,
  notSunday,
  prevMonth,
} from '../../lib/date';
import Arrow from '../icons/Arrow';
import { useEffect } from 'react';

export interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
}

export function Calendar({ date, setDate }: CalendarProps) {
  const month = getDaysForCalendarPage(date);

  const handleDaySwitcherFactory = (day: number) => () => {
    const mutableDate = new Date(date);
    mutableDate.setDate(day);
    setDate(mutableDate);
  };

  const handleMonthSwitcherFactory = (direction: 'prev' | 'next') => {
    return () => {
      setDate(direction === 'prev' ? prevMonth(date) : nextMonth(date));
    };
  };

  useEffect(() => {
    if (date.getDay() === 0) {
      setDate(notSunday(date));
    }
  }, [date]);

  return (
    <div className="border common-border rounded-md component-bg p-3">
      <div className="text-center flex items-center justify-between p-1">
        <button
          onClick={handleMonthSwitcherFactory('prev')}
          className="transition-colors rounded-lg group"
        >
          <div className="w-8 h-8 rotate-90 flex items-center justify-center">
            <Arrow
              className="transition-colors duration-75 fill-neutral-800 dark:fill-neutral-200 group-hover:fill-neutral-400 dark:group-hover:fill-neutral-600"
              width={16}
              height={9}
            />
          </div>
        </button>
        <p className="font-semibold text-lg text-neutral-800 dark:text-neutral-100">
          {getMonth(date)}, {date.getDate()}
        </p>
        <button
          onClick={handleMonthSwitcherFactory('next')}
          className="transition-colors rounded-lg group"
        >
          <div className="w-8 h-8 -rotate-90 flex items-center justify-center">
            <Arrow
              className="transition-colors duration-75 fill-neutral-800 dark:fill-neutral-200 group-hover:fill-neutral-400 dark:group-hover:fill-neutral-600"
              width={16}
              height={9}
            />
          </div>
        </button>
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              ПН
            </th>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              ВТ
            </th>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              СР
            </th>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              ЧТ
            </th>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              ПТ
            </th>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              СБ
            </th>
            <th className="transition-colors font-semibold text-sm text-readable-400 text-center w-10 h-10 dark:text-readable-600">
              ВС
            </th>
          </tr>
          {month.map((week, i) => (
            <tr key={i}>
              {week.map(day => (
                <td key={day.getTime()} className="w-10 h-10 p-1">
                  <button
                    onClick={handleDaySwitcherFactory(day.getDate())}
                    disabled={
                      day.getMonth() !== date.getMonth() || day.getDay() === 0
                    }
                    className={classNames({
                      'transition-colors duration-75 font-semibold text-center text-sm rounded-lg w-full h-full':
                        true,
                      'bg-accent-400 text-white dark:text-readable-200 dark:bg-accent-700 cursor-default':
                        day.getDate() === date.getDate() &&
                        day.getMonth() === date.getMonth(),
                      'hover:bg-zinc-100 dark:hover:bg-zinc-700':
                        day.getDate() !== date.getDate() &&
                        day.getMonth() === date.getMonth() &&
                        day.getDay() !== 0,
                      'text-readable-400 dark:text-readable-600':
                        day.getMonth() !== date.getMonth() ||
                        day.getDay() === 0,
                      'text-readable-700 dark:text-readable-200':
                        day.getMonth() === date.getMonth() &&
                        day.getDay() !== 0 &&
                        day.getDate() !== date.getDate(),
                    })}
                  >
                    {day.getDate()}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
