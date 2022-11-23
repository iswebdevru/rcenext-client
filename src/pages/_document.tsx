import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ru" className="h-full">
      <Head>
        <Script id="__enable_theme_memoization" strategy="beforeInteractive">
          {`
          const theme = localStorage.getItem('settings/theme');
          theme && document.documentElement.classList.add(theme);
          `}
        </Script>
      </Head>
      <body className="h-full transition-colors bg-zinc-100 dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
