'use client';

import classNames from 'classnames';

export interface CalendarProps {
  date: Date;
  setDate: (date: Date) => void;
}

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const DAY = 86400000;

function getDaysForCalendar(date: Date) {
  let current = new Date(date.getTime());
  current.setDate(1);
  const currentMonth = current.getMonth();
  const untilMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const result: number[][] = [[], [], [], [], [], [], []];
  let week = -1;
  while (current.getDay() !== 1) {
    current.setTime(current.getTime() - DAY);
  }
  while (current.getMonth() !== untilMonth) {
    current.getDay() === 1 && week++;
    result[week].push(current.getDate());
    current.setTime(current.getTime() + DAY);
  }
  return result;
}

export function Calendar({ date, setDate }: CalendarProps) {
  const month = getDaysForCalendar(date);
  const handleClickFactory = (day: number) => () => {
    const newDate = new Date(date);
    newDate.setDate(day);
    setDate(newDate);
  };
  return (
    <div>
      <div className="text-center">
        {MONTHS[date.getMonth()]}, {date.getDate()}
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <th className="text-center p-2">ПН</th>
            <th className="text-center p-2">ВТ</th>
            <th className="text-center p-2">СР</th>
            <th className="text-center p-2">ЧТ</th>
            <th className="text-center p-2">ПТ</th>
            <th className="text-center p-2">СБ</th>
            <th className="text-center p-2">ВС</th>
          </tr>
          {month.map(week => (
            <tr>
              {week.map(day => (
                <td
                  onClick={handleClickFactory(day)}
                  className={classNames({
                    'text-center cursor-pointer p-2 hover:bg-neutral-200': true,
                    'bg-neutral-200': day === date.getDate(),
                  })}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
