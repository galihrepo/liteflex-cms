
import { saveUser } from '@/src/services/user';
import { Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface GoogleLoginProps {
  auth: Auth;
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}

export const handleGoogleLogin = async (props: GoogleLoginProps) => {
  const { auth, onSuccess, onError } = props;
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await saveUser(user);
    onSuccess();
  } catch (error) {
    onError?.(error)
  }
};
