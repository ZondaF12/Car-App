import "@azure/core-asynciterator-polyfill";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AppleLogoSvg from "../../../assets/AppleLogoSvg";
import FacebookLogoSvg from "../../../assets/FacebookLogoSvg";
import GoogleLogoSvg from "../../../assets/GoogleLogoSvg";
import { database } from "../../../firebase";
import InputField from "../../components/InputField";
import LoginRegisterButton from "../../components/LoginRegisterButton";
import { useAuth } from "../../contexts/AuthContext";
import signInWithApple from "../../tools/signInWithApple";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Register"
>;

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<any>("");
    const { userSignUp, googleLogin, appleLogin } = useAuth();

    const registerPressed = async () => {
        if (registerPassword != confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const newUser = await userSignUp(
                registerEmail,
                registerPassword,
                name
            );

            await setDoc(doc(database, "users", newUser.uid), {
                email: newUser.email,
                name: name,
                accountType: "FREE",
            });

            await sendEmailVerification(newUser);
        } catch (err: any) {
            Alert.alert(err.message);
        }
        setLoading(false);
    };

    const onGoogleLoginPressed = async () => {
        await googleLogin();
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
                <Text className="text-2xl font-semibold text-white mb-8">
                    Get Started
                </Text>

                <View className="flex-row justify-between mb-8">
                    <TouchableOpacity
                        onPress={() => {
                            onGoogleLoginPressed();
                        }}
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
                        onPress={() => {
                            onAppleLoginPressed();
                        }}
                        className="border-[#707175] border-2 rounded-lg px-10 py-2"
                    >
                        <AppleLogoSvg height={24} width={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-white mb-8">
                    Or, Register with email ...
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
                    setLabel={setRegisterEmail}
                />
                <InputField
                    label="Full Name"
                    icon={
                        <MaterialIcons
                            name="person-outline"
                            size={20}
                            color={"#fff"}
                        />
                    }
                    setLabel={setName}
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
                    setLabel={setRegisterPassword}
                />
                <InputField
                    label="Confirm Password"
                    icon={
                        <MaterialIcons
                            name="lock-outline"
                            size={20}
                            color={"#fff"}
                        />
                    }
                    inputType="password"
                    setLabel={setConfirmPassword}
                />

                <LoginRegisterButton
                    label="Register"
                    onPress={registerPressed}
                />

                <View className="flex-row justify-center mb-8">
                    <Text className="text-white">Already Registered? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text className="text-[#6c5dd2] font-bold">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;
