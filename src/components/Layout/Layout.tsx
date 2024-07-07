import React, { PropsWithChildren } from 'react';
import { Header } from '../Header/Header';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'container'}>
      <Header />
      {children}
    </div>
  );
};
