import {firebaseAuth} from './firebase';

export const getCurrentUserUID = (): string => firebaseAuth.currentUser?.uid || '';
