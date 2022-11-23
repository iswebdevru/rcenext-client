import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { useMemo } from 'react';

import { Open_Sans } from '@next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles';
import '../styles/globals.css';
config.autoAddCss = false;

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function App({ Component, pageProps }: AppProps) {
  const client = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={client}>
      <div className={openSans.className}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
