// // useGoogleAuth.ts
// import { auth } from "@/config/configFirebase";
// import * as Google from "expo-auth-session/providers/google";
// import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
// import { useEffect } from "react";

// export function useGoogleAuth() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     // expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
//     // iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
//     // androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
//     webClientId: "646527104701-h6pcnmjhjhr0nfekvi7auch3hb7am2tq.apps.googleusercontent.com",
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential).catch(console.error);
//     }
//   }, [response]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       console.log("User state changed: ", user);
//     });
//     return unsubscribe;
//   }, []);

//   return { promptAsync };
// }


// useGoogleLogin.ts
import { auth } from "@/config/configFirebase";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

// Required by Expo
WebBrowser.maybeCompleteAuthSession();

export function useGoogleLogin() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
    // iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    // androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "646527104701-h6pcnmjhjhr0nfekvi7auch3hb7am2tq.apps.googleusercontent.com",
    responseType: "id_token",
  });

  useEffect(() => {
    const loginToFirebase = async () => {
    console.log("Google login response:", response);        

      if (response?.type === "success") {        
        const { idToken } = response.authentication ?? {};
        if (idToken) {
          const credential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, credential);
        }
      }
    };

    loginToFirebase();
  }, [response]);

  return {
    promptAsync,
    request,
  };
}
