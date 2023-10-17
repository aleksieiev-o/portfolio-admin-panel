import { FC, ReactElement } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import LoadingContextProvider  from '@/providers/LoadingContext.provider';
import { ChakraProvider } from '@chakra-ui/provider';
import { theme } from '@/theme';
import AuthContextProvider  from '@/providers/AuthContext.provider';
import { TypeComponentAuthFields } from '@/shared/types/Page.type';
import {pdfjs} from 'react-pdf';

type TypeAppProps = AppProps & TypeComponentAuthFields;

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
