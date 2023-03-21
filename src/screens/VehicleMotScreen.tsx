import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import MotSvgComponent from "../../assets/MotSvg";
import { ScrollView } from "react-native-gesture-handler";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleMot"
>;

const VehicleMotScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center w-full">
            <View className="my-10">
                <Text className="items-center justify-center text-white text-center text-2xl font-bold">
                    MOT Details
                </Text>
            </View>
            <View className="w-[90%]">
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">MOT Status</Text>
                    <Text className="text-white text-base">Valid</Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Due Date</Text>
                    <Text className="text-white text-base">
                        31 October 2023
                    </Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Expires</Text>
                    <Text className="text-white text-base">
                        286 Days
                        {/* {+dayDifference > 0
                            ? `${dayDifference} Days`
                            : +dayDifference < 0
                            ? `${+dayDifference * -1} Days Ago`
                            : "N/A"} */}
                    </Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4 mt-5">
                    <Text className="text-white text-base">12 Month Tax</Text>
                    <Text className="text-white text-base">£54</Text>
                </View>
            </View>
            <View className="w-[90%] bg-[#33343b] p-2 mt-4">
                <Text className="text-white font-bold">MOT Mileage Data</Text>
            </View>
            <ScrollView
                style={{ width: "90%" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mt-8 space-y-4">
                    <TouchableOpacity className="w-full bg-green-500 h-16 rounded-md flex-row">
                        <View className="justify-center items-center px-4 ">
                            <MotSvgComponent
                                color={"#02A64F"}
                                height={50}
                                width={50}
                            />
                        </View>
                        <View className="justify-center pr-4">
                            <Text className="text-base">21 Oct 2022</Text>
                            <Text className="opacity-50">PASSED</Text>
                        </View>
                        <View className="justify-center ml-auto px-4">
                            <Text className="text-base">48704 mi</Text>
                            <Text className="opacity-50">+4967 mi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full bg-red-500 h-16 rounded-md flex-row opacity-50">
                        <View className="justify-center items-center px-4 ">
                            <MotSvgComponent
                                color={"#D90000"}
                                height={50}
                                width={50}
                            />
                        </View>
                        <View className="justify-center pr-4">
                            <Text className="text-base">21 Oct 2022</Text>
                            <Text className="opacity-50">FAILED</Text>
                        </View>
                        <View className="justify-center ml-auto px-4">
                            <Text className="text-base">48704 mi</Text>
                            <Text className="opacity-50"></Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full bg-green-500 h-16 rounded-md flex-row opacity-50">
                        <View className="justify-center items-center px-4 ">
                            <MotSvgComponent
                                color={"#02A64F"}
                                height={50}
                                width={50}
                            />
                        </View>
                        <View className="justify-center pr-4">
                            <Text className="text-base">17 Oct 2021</Text>
                            <Text className="opacity-50">PASSED</Text>
                        </View>
                        <View className="justify-center ml-auto px-4">
                            <Text className="text-base">41704 mi</Text>
                            <Text className="opacity-50">+7398 mi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full bg-green-500 h-16 rounded-md flex-row opacity-50">
                        <View className="justify-center items-center px-4 ">
                            <MotSvgComponent
                                color={"#02A64F"}
                                height={50}
                                width={50}
                            />
                        </View>
                        <View className="justify-center pr-4">
                            <Text className="text-base">12 Oct 2020</Text>
                            <Text className="opacity-50">PASSED</Text>
                        </View>
                        <View className="justify-center ml-auto px-4">
                            <Text className="text-base">36328 mi</Text>
                            <Text className="opacity-50">+9273 mi</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VehicleMotScreen;
