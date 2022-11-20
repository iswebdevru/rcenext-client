import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

export interface SearchProps extends ComponentPropsWithoutRef<'input'> {
  text: string;
  setText: (text: string) => void;
}

export default function Search({ text, setText, ...restProps }: SearchProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setText(event.currentTarget.value);
  };
  return (
    <input
      {...restProps}
      type="search"
      value={text}
      onChange={handleChange}
      className="text-sm common-text common-outline common-focus common-placeholder bg-white px-4 h-9 transition-[outline,background] duration-75 rounded-md w-full outline outline-1 dark:bg-zinc-800"
    />
  );
}
