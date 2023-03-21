import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressCircle from "react-native-progress-circle";

const VehiclesScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center">
            <Text className="text-white uppercase text-2xl p-4">My Garage</Text>
            <View className="flex-row gap-10">
                <View className="items-center">
                    <ProgressCircle
                        percent={30}
                        radius={40}
                        borderWidth={3}
                        color="#6c5dd2"
                        shadowColor="#999"
                        bgColor="#1e2128"
                    >
                        <Text className="text-base text-[#6c5dd2]">30%</Text>
                    </ProgressCircle>
                    <Text className="pt-4 text-base text-[#6c5dd2]">MOT</Text>
                </View>
                <View className="items-center">
                    <ProgressCircle
                        percent={60}
                        radius={40}
                        borderWidth={3}
                        color="#6c5dd2"
                        shadowColor="#999"
                        bgColor="#1e2128"
                    >
                        <Text className="text-base text-[#6c5dd2]">30%</Text>
                    </ProgressCircle>
                    <Text className="pt-4 text-base text-[#6c5dd2]">TAX</Text>
                </View>
                <View className="items-center">
                    <ProgressCircle
                        percent={87}
                        radius={40}
                        borderWidth={3}
                        color="#D90000"
                        shadowColor="#999"
                        bgColor="#1e2128"
                    >
                        <Text className="text-base text-[#D90000]">30%</Text>
                    </ProgressCircle>
                    <Text className="pt-4 text-base text-[#6c5dd2]">
                        INSURANCE
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VehiclesScreen;
