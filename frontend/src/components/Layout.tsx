import React from 'react';

import Navbar from '@/layout/Navbar';
import Header from '@/layout/Header';
import clsx from 'clsx';

interface LayoutProps {
  className? : string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <Header/>
      <div className="flex flex-1 overflow-hidden">
        <Navbar/>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;