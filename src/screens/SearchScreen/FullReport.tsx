import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "FullReport"
>;

const FullReport = () => {
    return (
        <View className="flex-1 bg-[#1e2128] items-center justify-center">
            <Text className="text-white">Coming Soon!</Text>
        </View>
    );
};

export default FullReport;
