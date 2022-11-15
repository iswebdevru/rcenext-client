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
      className="text-sm common-text bg-zinc-50 px-4 h-9 transition-[outline,background] duration-75 rounded-md w-full outline outline-1 common-outline common-focus dark:bg-zinc-800  dark:placeholder:text-zinc-500"
    />
  );
}
