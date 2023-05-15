import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    label: string;
    onPress?: any;
    bold?: boolean;
};

const SettingsButton = ({ label, onPress, bold }: Props) => {
    return (
        <View className="mx-8 py-4 border-b border-[#707175]">
            <TouchableOpacity
                className="flex-row justify-between items-center"
                onPress={onPress}
            >
                <Text
                    className={`text-white text-base ${
                        bold ? "font-bold" : ""
                    }`}
                >
                    {label}
                </Text>
                <Entypo name="chevron-thin-right" size={18} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default SettingsButton;
