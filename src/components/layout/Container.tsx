import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="flex gap-6 items-start">{children}</div>;
}
