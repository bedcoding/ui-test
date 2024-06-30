import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // QueryClientProvider로 전체 앱을 감싸주어 React Query를 활성화
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
