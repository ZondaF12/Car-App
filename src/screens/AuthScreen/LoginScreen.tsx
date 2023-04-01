import { MaterialIcons } from "@expo/vector-icons";
import {
    BaseNavigationContainer,
    useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
    OAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import AppleLogoSvg from "../../../assets/AppleLogoSvg";
import FacebookLogoSvg from "../../../assets/FacebookLogoSvg";
import GoogleLogoSvg from "../../../assets/GoogleLogoSvg";
import { auth } from "../../../firebase";
import InputField from "../../components/InputField";
import LoginRegisterButton from "../../components/LoginRegisterButton";

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
    const [user, setUser] = useState(undefined);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId:
            "1091684992494-vc38t5sbt2jpk3a1al1kdboso9q19no2.apps.googleusercontent.com",
        clientId:
            "1091684992494-v5fcm398rreg0d3b5va0l7p1ii10qh6a.apps.googleusercontent.com",
    });

    const onLoginPressed = async (data: any) => {
        setLoading(true);
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(user);

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

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const onAppleLoginPressed = async () => {
        try {
            const provider = new OAuthProvider("apple.com");
            const res = await signInWithPopup(auth, provider);
            BaseNavigationContainer;
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-end bg-[#1e2128]">
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
        </SafeAreaView>
    );
};

export default LoginScreen;
