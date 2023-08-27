import React, { createContext, FC, PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import { User } from '@firebase/auth';
import { IUser } from '@/components/views/Login/login.types';
import { TypeComponentAuthFields } from '@/shared/types/Page.type';
import { useRouter } from 'next/router';
import {ProtectedRoutePath, PublicRoutePath} from '@/router/Routes.enum';
import { LoadingContext } from '@/providers/LoadingContext.provider';

interface IAuthContextState {
  currentUser: IUser | null;
  authState: boolean;
}

export const AuthContext = createContext<IAuthContextState>({
  currentUser: null,
  authState: false,
});

const AuthContextProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (props): ReactElement => {
  const { children, Component: {withAuth} } = props;
  const {setGlobalLoading} = useContext(LoadingContext);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [authState, setAuthState] = useState<boolean>(false);
  const {push, replace} = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      setGlobalLoading(true);

      if (withAuth && !user) {
        setCurrentUser(null);
        setAuthState(false);
        await replace(PublicRoutePath.LOGIN);
      } else if (user && user.uid) {
        setCurrentUser({ uid: user.uid, email: user.email });
        const token = await user.getIdToken();
        setAuthState(true);
        await push(ProtectedRoutePath.PERSONAL_INFO);
      }

      await setGlobalLoading(false);
    });
  }, []);

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
