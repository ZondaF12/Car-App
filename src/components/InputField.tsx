import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    label: string;
    setLabel?: any;
    icon?: any;
    inputType?: string;
    keyboardType?: any;
    fieldButtonText?: string;
    fieldButtonFunction?: any;
};

const InputField = ({
    label,
    setLabel,
    icon,
    inputType,
    keyboardType,
    fieldButtonText,
    fieldButtonFunction,
}: Props) => {
    return (
        <View className="flex-row border-b border-white pb-2 mb-6 space-x-2">
            {icon}
            {inputType === "password" ? (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    className="flex-1 py-0 text-white"
                    secureTextEntry={true}
                    onChangeText={setLabel}
                    placeholderTextColor="#707175"
                />
            ) : (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    onChangeText={setLabel}
                    className="flex-1 py-0 text-white"
                    placeholderTextColor="#707175"
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                <Text className="font-bold text-[#6c5dd2]">
                    {fieldButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default InputField;
