import React from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head></head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
