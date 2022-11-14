import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <Script id="__enable_theme_memoization" strategy="beforeInteractive">
          {`
          console.log('here');
          const theme = localStorage.getItem('settings/theme');
          theme && document.documentElement.classList.add(theme);
          `}
        </Script>
      </Head>
      <body className="bg-white transition-colors dark:bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
