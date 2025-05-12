import { auth } from '@/config/configFirebase';
import { saveUser } from '@/services/user';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    saveUser(user);
  } catch (error) {
    console.error('Error during Google login: ', error);
  }
};
