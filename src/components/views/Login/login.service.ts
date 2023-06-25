import { IAuthRequestDto, IUser } from '@/components/views/Login/login.types';
import { signInWithEmailAndPassword, signOut, UserCredential } from '@firebase/auth';
import { firebaseAuth } from '@/firebase';

export const loginEmailPassword = async (payload: IAuthRequestDto): Promise<IUser> => {
  const { email, password } = payload;
  const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return userCredential.user;
};

export const logout = async (): Promise<void> => {
  return await signOut(firebaseAuth);
};
