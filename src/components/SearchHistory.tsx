import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Search"
>;

type Props = {
    numberPlate: string;
    carModel: string;
    regYear: number;
    date: Date; //Change this to date
};

const SearchHistory = ({ numberPlate, carModel, regYear, date }: Props) => {
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
                <Text className="text-white text-base">
                    {`${regYear} ${carModel}`}
                </Text>
                <Text className="text-[#707175] text-xs">
                    {moment(date).fromNow()}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default SearchHistory;
