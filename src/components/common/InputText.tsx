import { ComponentPropsWithoutRef } from 'react';

export default function InputText(props: ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      {...props}
      type="text"
      className="w-full min-w-0 transition-[outline] duration-75 outline outline-1 common-outline common-focus px-4 h-8 text-sm rounded-md"
    />
  );
}
