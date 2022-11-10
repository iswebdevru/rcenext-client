import { PropsWithChildren } from 'react';
import SideBar from '../../components/layout/SideBar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mt-20 px-4 mx-auto flex max-w-7xl gap-6 items-start">
      <SideBar title="sadf">
        <div>hello</div>
      </SideBar>
      <div>{children}</div>
    </div>
  );
}
