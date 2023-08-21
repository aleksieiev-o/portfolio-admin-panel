import React, { createContext, FC, PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/firebase';
import { User } from '@firebase/auth';
import { IUser } from '@/components/views/Login/login.types';
import { TypeComponentAuthFields } from '@/shared/types/Page.type';
import { useRouter } from 'next/router';
import {ProtectedRoutePath, PublicRoutePath} from '@/router/Routes.enum';
import { LoadingContext } from '@/providers/LoadingContext.provider';

interface IAuthContextState {
  currentUser: IUser;
  authState: boolean;
  // error: Error | undefined;
  // setCurrentUser: Dispatch<SetStateAction<IUser>>;
}

export const AuthContext = createContext<IAuthContextState>({
  currentUser: {} as IUser,
  authState: false,
  // error: undefined,
});

const AuthContextProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (props): ReactElement => {
  const { children, Component: {withAuth} } = props;
  const {setGlobalLoading} = useContext(LoadingContext);
  const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
  const [authState, setAuthState] = useState<boolean>(false);
  const {push, replace} = useRouter();

  const reloadFirebaseUser = async () => {
    await firebaseAuth.currentUser?.reload();

    if (firebaseAuth.currentUser) {
      setCurrentUser({ uid: firebaseAuth.currentUser.uid, email: firebaseAuth.currentUser.email });
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      setGlobalLoading(true);

      if (withAuth && !user) {
        setCurrentUser({} as IUser);
        setAuthState(false);
        await replace(PublicRoutePath.LOGIN);
      } else if (user && user.uid) {
        await reloadFirebaseUser();
        setAuthState(true);
        await push(ProtectedRoutePath.PERSONAL_INFO);
      }

      await setGlobalLoading(false);
    });
    // TODO fix Warning for useEffect dependency
  }, [currentUser?.uid]);

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
