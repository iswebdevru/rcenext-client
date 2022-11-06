import React from 'react';
import Header from './Header';
import '../styles/globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem('settings/theme');theme && document.documentElement.classList.add(theme);
            `,
          }}
        ></script>
      </head>
      <body className="bg-white dark:bg-zinc-900 transition-colors">
        <Header />
        {children}
      </body>
    </html>
  );
}
