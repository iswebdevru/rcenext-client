import { ChangeEventHandler } from 'react';

export interface SearchProps {
  text: string;
  setText: (text: string) => void;
}

export default function Search({ text, setText }: SearchProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setText(event.currentTarget.value);
  };
  return (
    <input
      type="search"
      placeholder="Искать по группе"
      value={text}
      onChange={handleChange}
      className="text-sm text-neutral-800 px-3 py-1 transition-[outline,background] duration-75 rounded-md w-full outline-zinc-200 outline-none outline-offset-0 outline-2 focus:outline-violet-200 dark:focus:outline-violet-700 dark:bg-zinc-800 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:text-neutral-100"
    />
  );
}
