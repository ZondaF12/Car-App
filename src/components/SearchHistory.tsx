import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Search"
>;

type Props = {
    numberPlate: string;
    carModel: string;
    date: string; //Change this to date
};

const SearchHistory = ({ numberPlate, carModel, date }: Props) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity
            className="flex-row border border-[#33343b] rounded-lg h-16 w-[90%] items-center mb-3"
            onPress={(event) => {
                navigation.navigate("VehicleCheck", {
                    numberPlate: numberPlate,
                });
            }}
        >
            <View className="ml-2 bg-[#6c5dd2] w-32 h-12 rounded-md items-center justify-center">
                <Text className="uppercase font-bold text-lg text-white">
                    {numberPlate}
                </Text>
            </View>
            <View className="ml-4">
                <Text className="text-white text-base">{carModel}</Text>
                <Text className="text-[#707175] text-xs">{date}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SearchHistory;
