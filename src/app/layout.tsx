import React from 'react';
import Header from '../components/Header';
import ThemeScript from '../components/internal/ThemeScript';
import '../styles/globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ThemeScript />
      </head>
      <body className="bg-white dark:bg-zinc-900 transition-colors common-scrollbar">
        <Header />
        {children}
      </body>
    </html>
  );
}
