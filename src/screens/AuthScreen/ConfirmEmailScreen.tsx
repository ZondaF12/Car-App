import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "../../types/rootStackParamList";

import InputField from "../../components/InputField";
import LoginRegisterButton from "../../components/LoginRegisterButton";

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
            navigation.navigate("Login");
        } catch (err: any) {
            Alert.alert("Oops", err.message);
        }
    };

    const onResendPressed = async () => {
        try {
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
