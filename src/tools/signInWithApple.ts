import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { OAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../firebase";

const signInWithApple = async () => {
    const nonce = Math.random().toString(36).substring(2, 10);

    return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
        .then(async (hashedNonce) => {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
                nonce: hashedNonce,
            });

            return credential;
        })
        .then(async (appleCredential) => {
            const { identityToken } = appleCredential;
            const provider = new OAuthProvider("apple.com");
            const credential = provider.credential({
                idToken: identityToken!,
                rawNonce: nonce,
            });

            const res = await signInWithCredential(auth, credential);

            if (appleCredential.email) {
                await setDoc(doc(database, "users", res.user.uid), {
                    email: appleCredential.email,
                    name: appleCredential.fullName?.givenName,
                    accountType: "FREE",
                });
            }
            return res;
        })
        .catch((error) => {
            console.log(error);
        });
};

export default signInWithApple;
