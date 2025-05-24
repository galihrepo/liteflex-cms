

import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../config/configFirebase';


import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();

export const useGoogleLogin = () => {
  
  const [user, setUser] = useState<UserCredential|null>(null)

  const [error, setError] = useState<any>(null)

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '646527104701-h6pcnmjhjhr0nfekvi7auch3hb7am2tq.apps.googleusercontent.com',
  });
  console.log('BERAK Redirect URI:', request?.redirectUri);
  useEffect(() => {
    

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCred) => {
          setUser(userCred)
        })
        .catch((err) => setError(err));
    }
  }, [response]);

  return { promptAsync, user, error }
};

// import { Auth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

// interface GoogleLoginProps {
//   auth: Auth;
//   onSuccess: (user: User) => void;
//   onError?: (error: unknown) => void;
// }

// export const handleGoogleLogin = async (props: GoogleLoginProps) => {
//   const { auth, onSuccess, onError } = props;
//   const provider = new GoogleAuthProvider();
//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     onSuccess(user);
//   } catch (error) {
//     onError?.(error)
//   }
// };
