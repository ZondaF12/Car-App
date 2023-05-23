import { CLIENT_ID, IOS_CLIENT_ID } from "@env";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAdditionalUserInfo,
    signInWithCredential,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../../firebase";

const AuthContext = createContext<any>({});

export function useAuth() {
    return useContext(AuthContext);
}

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState();
    const [token, setToken] = useState<any>("");

    const [request, response, promptAsync]: any = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        clientId: CLIENT_ID,
    });

    useEffect(() => {
        console.log("TESTING123");

        const handleUserInfo = async () => {
            await getUserInfo();
        };
        console.log(response?.type);

        if (response?.type === "success") {
            setToken(response?.authentication!.accessToken);
            handleUserInfo();
        }
    }, [response]);

    const getUserInfo = async () => {
        try {
            const credential = GoogleAuthProvider.credential(null, token);

            const login = await signInWithCredential(auth, credential);

            const { isNewUser } = getAdditionalUserInfo(login)!;

            if (isNewUser) {
                await setDoc(doc(database, "users", login.user.uid), {
                    email: login.user.email,
                    name: login.user.displayName,
                    accountType: "FREE",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function userLogin(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    function userSignOut() {
        return auth.signOut();
    }

    async function userSignUp(email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function googleLogin() {
        try {
            promptAsync();
        } catch (error) {
            console.log(error);
        }
    }

    function getUser() {
        return auth.currentUser;
    }

    const checkUser = async (user: any) => {
        setUser(user);
    };

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(checkUser);
        return subscriber;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                getUser,
                userLogin,
                userSignOut,
                userSignUp,
                googleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
