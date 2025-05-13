
import { Auth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

interface GoogleLoginProps {
  auth: Auth;
  onSuccess: (user: User) => void;
  onError?: (error: unknown) => void;
}

export const handleGoogleLogin = async (props: GoogleLoginProps) => {
  const { auth, onSuccess, onError } = props;
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    onSuccess(user);
  } catch (error) {
    onError?.(error)
  }
};
