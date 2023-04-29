import "@azure/core-asynciterator-polyfill";
import { CLIENT_ID, IOS_CLIENT_ID } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Google from "expo-auth-session/providers/google";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithCredential,
    updateProfile,
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootStackParamList } from "../../../App";
import AppleLogoSvg from "../../../assets/AppleLogoSvg";
import FacebookLogoSvg from "../../../assets/FacebookLogoSvg";
import GoogleLogoSvg from "../../../assets/GoogleLogoSvg";
import { auth, database } from "../../../firebase";
import InputField from "../../components/InputField";
import LoginRegisterButton from "../../components/LoginRegisterButton";
import signInWithApple from "../../tools/signInWithApple";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Register"
>;

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [dobLabel, setDobLabel] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<any>("");
    const [userInfo, setUserInfo] = useState<any>(null);

    const [request, response, promptAsync]: any = Google.useAuthRequest({
        iosClientId: IOS_CLIENT_ID,
        clientId: CLIENT_ID,
    });

    const registerPressed = async () => {
        if (registerPassword != confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );

            await updateProfile(newUser.user, {
                displayName: name,
            });

            await setDoc(doc(database, "users", newUser.user.uid), {
                email: newUser.user.email,
                name: name,
            });

            await sendEmailVerification(newUser.user);

            // navigation.navigate("ConfirmEmail", { email: registerEmail });
        } catch (err: any) {
            Alert.alert(err.message);
        }
        setLoading(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        hideDatePicker();
        setDobLabel(date.toLocaleDateString("EN-GB"));
    };

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

            await signInWithCredential(auth, credential);
        } catch (error) {
            // Add your own error handler here
        }
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

                <View className="flex-row border-[#ccc] border-b pb-2 mb-8">
                    <MaterialIcons name="date-range" size={20} color={"#fff"} />
                    <TouchableOpacity
                        onPress={showDatePicker}
                        className="justify-center items-center"
                    >
                        <Text className="text-white ml-2 ">
                            {dobLabel ? dobLabel : "Date of Birth"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    display={"inline"}
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
