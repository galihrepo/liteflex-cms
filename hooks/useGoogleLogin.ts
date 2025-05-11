import { auth } from '@/config/configFirebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Logged in user: ', user);
    // need redirect to home perhaps
  } catch (error) {
    console.error('Error during Google login: ', error);
  }
};
