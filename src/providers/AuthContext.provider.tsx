import React, { createContext, FC, PropsWithChildren, ReactElement, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/firebase';
import { User as FirebaseUser } from '@firebase/auth';
import { IUser } from '@/components/views/Login/login.types';
import { TypeComponentAuthFields } from '@/types/Page.type';
import { useRouter } from 'next/router';
import { PublicRoutePath } from '@/router/Routes.enum';

type TypeCurrentUser = IUser | null;

interface IAuthContextState {
  currentUser: TypeCurrentUser;
  authState: boolean;
  loading: boolean;
  // error: Error | undefined;
  // setCurrentUser: Dispatch<SetStateAction<IUser>>;
}

export const AuthContext = createContext<IAuthContextState>({
  currentUser: null,
  authState: false,
  loading: false,
  // error: undefined,
});

const AuthContextProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (props): ReactElement => {
  const { children, Component: {withAuth} } = props;
  const [currentUser, setCurrentUser] = useState<TypeCurrentUser>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<boolean>(false);
  const {replace} = useRouter();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user: FirebaseUser | null) => {
      setLoading(true);

      if (withAuth && !user) {
        setCurrentUser(null);
        setAuthState(false);
        await replace(PublicRoutePath.LOGIN);
      } else if (user && user.uid) {
        setCurrentUser({ uid: user.uid, email: user.email });
        setAuthState(true);
      }

      await setLoading(false);
    });
  });

  const authContext: IAuthContextState = {
    currentUser,
    loading,
    authState,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
