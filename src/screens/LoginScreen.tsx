import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import GoogleLogoSvg from "../../assets/GoogleLogoSvg";
import AppleLogoSvg from "../../assets/AppleLogoSvg";
import FacebookLogoSvg from "../../assets/FacebookLogoSvg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import LoginRegisterButton from "../components/LoginRegisterButton";
import InputField from "../components/InputField";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);

    const onLoginPressed = async (data: any) => {
        setLoading(true);
        try {
            await Auth.signIn(email, password);
            navigation.navigate("Vehicles");
            setLoading(false);
        } catch (error: any) {
            Alert.alert("Oops", error.message);
        }
        setLoading(false);
    };

    const onGoogleLoginPressed = async () => {
        try {
            const res = await Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
            });

            console.log(res);
        } catch (error: any) {
            Alert.alert("Oops", error.message);
        }
    };

    const onAppleLoginPressed = async () => {
        try {
            const res = await Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Apple,
            });

            console.log(res);
        } catch (error: any) {
            Alert.alert("Oops", error.message);
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
                        onPress={onAppleLoginPressed}
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
