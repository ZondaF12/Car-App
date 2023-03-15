import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleMot"
>;

const VehicleMotScreen = () => {
    return (
        <ScrollView className="flex-1 bg-[#16242c]">
            <View className="mt-10 space-y-2">
                <Text className="items-center justify-center text-white text-center">
                    MOT
                </Text>
            </View>
        </ScrollView>
    );
};

export default VehicleMotScreen;
