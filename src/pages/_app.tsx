import { FC, ReactElement } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import LoadingContextProvider  from '@/providers/LoadingContext.provider';
import { ChakraProvider } from '@chakra-ui/provider';
import { theme } from '@/theme';
import AuthContextProvider  from '@/providers/AuthContext.provider';
import { TypeComponentAuthFields } from '@/shared/types/Page.type';

type TypeAppProps = AppProps & TypeComponentAuthFields;

const App: FC<TypeAppProps> = (props): ReactElement => {
  const {Component, pageProps} = props;

  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <LoadingContextProvider>
        <AuthContextProvider Component={Component}>
          <Component {...pageProps} />
        </AuthContextProvider>
      </LoadingContextProvider>
    </ChakraProvider>
  );
};

export default App;
