import { FC, ReactElement } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/provider';
import { theme } from '@/theme';

const App: FC<AppProps> = (props): ReactElement => {
  const {Component, pageProps} = props;

  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
