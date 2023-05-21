import { CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
    GoogleAuthProvider,
    getAdditionalUserInfo,
    signInWithCredential,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStackParamList } from "../../types/rootStackParamList";

import AppleLogoSvg from "../../../assets/AppleLogoSvg";
import FacebookLogoSvg from "../../../assets/FacebookLogoSvg";
import GoogleLogoSvg from "../../../assets/GoogleLogoSvg";
import { auth, database } from "../../../firebase";
import InputField from "../../components/InputField";
import LoginRegisterButton from "../../components/LoginRegisterButton";
import signInWithApple from "../../tools/signInWithApple";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<any>("");
    const [userInfo, setUserInfo] = useState<any>(null);

    const [request, response, promptAsync]: any = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        clientId: CLIENT_ID,
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response?.authentication!.accessToken);
            getUserInfo();
        }
    }, [response, token]);

    const getUserInfo = async () => {
        try {
            const res = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await res.json();
            setUserInfo(user);

            const credential = GoogleAuthProvider.credential(
                userInfo?.id,
                response?.authentication.accessToken
            );

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
            // Add your own error handler here
        }
    };

    const onLoginPressed = async (data: any) => {
        setLoading(true);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            navigation.navigate("Vehicles");
            setLoading(false);
        } catch (error: any) {
            Alert.alert("Oops", error.message);
        }
        setLoading(false);
    };

    const onGoogleLoginPressed = async () => {
        try {
            promptAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const onAppleLoginPressed = async () => {
        try {
            await signInWithApple();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 justify-end bg-[#1e2128]"
            behavior="padding"
        >
            <View className="px-6">
                <Text className="text-2xl font-semibold text-white mb-8 leading-10">
                    Hello There,{"\n"}Welcome Back
                </Text>

                <InputField
                    label="Email"
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color={"#fff"}
                        />
                    }
                    keyboardType="email-address"
                    setLabel={setEmail}
                />

                <InputField
                    label="Password"
                    icon={
                        <MaterialIcons
                            name="lock-outline"
                            size={20}
                            color={"#fff"}
                        />
                    }
                    inputType="password"
                    fieldButtonText="Forgot?"
                    fieldButtonFunction={() => {}}
                    setLabel={setPassword}
                />

                <LoginRegisterButton
                    label="Login"
                    onPress={onLoginPressed}
                    loading={loading}
                />

                <Text className="text-center text-white mb-8">
                    Or, Login with ...
                </Text>

                <View className="flex-row justify-between mb-8">
                    <TouchableOpacity
                        // disabled={!request}
                        onPress={onGoogleLoginPressed}
                        className="border-[#707175] border-2 rounded-lg px-10 py-2"
                    >
                        <GoogleLogoSvg height={24} width={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {}}
                        className="border-[#707175] border-2 rounded-lg px-10 py-2"
                    >
                        <FacebookLogoSvg height={24} width={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onAppleLoginPressed()}
                        className="border-[#707175] border-2 rounded-lg px-10 py-2"
                    >
                        <AppleLogoSvg height={24} width={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mb-8">
                    <Text className="text-white">New to the app? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text className="text-[#6c5dd2] font-bold">
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
