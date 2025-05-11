import { auth } from '@/config/configFirebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider); // Open the Google login popup
    const user = result.user;
    console.log('Logged in user: ', user);
    // You can now store the user data and proceed with your app flow
  } catch (error) {
    console.error('Error during Google login: ', error);
  }
};
