import { View, Text, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type Props = {
    label: string;
    icon: any;
    primaryColor: string;
    secondaryColor: string;
    lastItem?: boolean;
    switchButton?: boolean;
};

const SettingsButton = ({
    label,
    icon,
    primaryColor,
    secondaryColor,
    lastItem,
    switchButton,
}: Props) => {
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View
            className={`flex-row px-8 items-center ${lastItem ? "" : "mb-8"}`}
        >
            <View
                className={`bg-[${secondaryColor}] w-12 h-12 items-center justify-center rounded-full`}
            >
                <Ionicons name={icon} size={24} color={primaryColor} />
            </View>
            <View className="pl-8 justify-center">
                <Text className="text-white text-lg">{label}</Text>
            </View>

            {switchButton ? (
                <Switch
                    className="ml-auto"
                    trackColor={{ false: "#33343b", true: "#6c5dd2" }}
                    thumbColor="#fff"
                    ios_backgroundColor="#33343b"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            ) : (
                <TouchableOpacity className="bg-[#707175] w-12 h-12 opacity-50 items-center justify-center rounded-xl ml-auto">
                    <Entypo name="chevron-right" size={20} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SettingsButton;
