import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
    label: string;
    onPress: any;
    loading?: boolean;
};

const LoginRegisterButton = ({ label, onPress, loading }: Props) => {
    return (
        <TouchableOpacity
            className="bg-[#6c5dd2] p-5 rounded-lg mb-8"
            onPress={onPress}
        >
            <Text className="text-center font-bold text-base text-[#dde1e6]">
                {loading ? "Loading..." : label}
            </Text>
        </TouchableOpacity>
    );
};

export default LoginRegisterButton;
