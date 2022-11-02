import React from 'react';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
