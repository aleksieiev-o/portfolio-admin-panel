import React, { createContext, FC, PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/firebase';
import { User as FirebaseUser } from '@firebase/auth';
import { IUser } from '@/components/views/Login/login.types';
import { TypeComponentAuthFields } from '@/shared/types/Page.type';
import { useRouter } from 'next/router';
import { PublicRoutePath } from '@/router/Routes.enum';
import { LoadingContext } from '@/providers/LoadingContext.provider';

type TypeCurrentUser = IUser | null;

interface IAuthContextState {
  currentUser: TypeCurrentUser;
  authState: boolean;
  // error: Error | undefined;
  // setCurrentUser: Dispatch<SetStateAction<IUser>>;
}

export const AuthContext = createContext<IAuthContextState>({
  currentUser: null,
  authState: false,
  // error: undefined,
});

const AuthContextProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (props): ReactElement => {
  const { children, Component: {withAuth} } = props;
  const {setGlobalLoading} = useContext(LoadingContext);
  const [currentUser, setCurrentUser] = useState<TypeCurrentUser>(null);
  const [authState, setAuthState] = useState<boolean>(false);
  const {replace} = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user: FirebaseUser | null) => {
      setGlobalLoading(true);

      if (withAuth && !user) {
        setCurrentUser(null);
        setAuthState(false);
        await replace(PublicRoutePath.LOGIN);
      } else if (user && user.uid) {
        setCurrentUser({ uid: user.uid, email: user.email });
        setAuthState(true);
      }

      await setGlobalLoading(false);
    });
  });

  const authContext: IAuthContextState = {
    currentUser,
    authState,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
