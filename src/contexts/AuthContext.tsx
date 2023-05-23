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
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../../firebase";
import signInWithApple from "../tools/signInWithApple";

const AuthContext = createContext<any>({});

export function useAuth() {
    return useContext(AuthContext);
}

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState();

    const [request, response, promptAsync]: any = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        clientId: CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === "success") {
            getUserInfo(response?.authentication!.accessToken);
        }
    }, [response]);

    const getUserInfo = async (token: string) => {
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

    async function appleLogin() {
        try {
            await signInWithApple();
        } catch (error) {
            console.log(error);
        }
    }

    function getUser() {
        return auth.currentUser;
    }

    async function getUserName() {
        const res = doc(database, "users", auth.currentUser?.uid!);
        const getUserName = await getDoc(res);
        const docData = getUserName.data();

        return docData?.name;
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
                getUserName,
                userLogin,
                userSignOut,
                userSignUp,
                googleLogin,
                appleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
