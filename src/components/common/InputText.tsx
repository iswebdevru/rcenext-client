import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';

export default function InputText(props: ComponentPropsWithoutRef<'input'>) {
  const [alreadySeen, setAlreadySeen] = useState(false);
  return (
    <input
      {...props}
      type="text"
      onFocus={() => !alreadySeen && setAlreadySeen(true)}
      className={classNames({
        'w-full min-w-0 transition-[outline] duration-75 outline outline-1 common-outline common-focus px-4 h-8 text-sm rounded-md text-readable-800 bg-white dark:text-readable-200 dark:bg-zinc-800':
          true,
        'common-invalid common-valid': alreadySeen,
      })}
    />
  );
}
