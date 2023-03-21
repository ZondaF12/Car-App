import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import InputField from "../components/InputField";
import LoginRegisterButton from "../components/LoginRegisterButton";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "ConfirmEmail"
>;

const ConfirmEmailScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const { email } = route.params;
    const [code, setCode] = useState("");

    const onConfirmPressed = async () => {
        try {
            await Auth.confirmSignUp(email, code);
            navigation.navigate("Login");
        } catch (err: any) {
            Alert.alert("Oops", err.message);
        }
    };

    const onResendPressed = async () => {
        try {
            await Auth.resendSignUp(email);
            Alert.alert("Success", "Code was resent to your email");
        } catch (err: any) {
            Alert.alert("Oops", err.message);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-end bg-[#1e2128]">
            <View className="px-6">
                <Text className="text-2xl font-semibold text-white mb-8 ">
                    Confirm Email
                </Text>

                <InputField
                    label="Enter your email confrimation code"
                    setLabel={setCode}
                />

                <LoginRegisterButton
                    label="Confirm"
                    onPress={onConfirmPressed}
                />
                <LoginRegisterButton
                    label="Resend Code"
                    onPress={onResendPressed}
                />
            </View>
        </SafeAreaView>
    );
};

export default ConfirmEmailScreen;
