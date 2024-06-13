import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useCallback,
  useState,
} from 'react';

interface ILoadingContextState {
  globalLoading: boolean;
  setGlobalLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<ILoadingContextState>({
  globalLoading: false,
  setGlobalLoading: (state) => state,
});

const LoadingContextProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  const loaderContext: ILoadingContextState = {
    globalLoading,
    setGlobalLoading,
  };

  return (
    <LoadingContext.Provider value={loaderContext}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
