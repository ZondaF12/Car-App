import {
    View,
    Text,
    TextInput,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryFlag from "react-native-country-flag";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { getVehicleDetails } from "../tools/getVehicleDetails";
import SearchHistory from "../components/SearchHistory";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Search"
>;

const searchReg = async (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    navigation: NavigationProp
) => {
    const res = getVehicleDetails(event.nativeEvent.text);

    navigation.navigate("VehicleCheck");
};

const SearchScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center justify-start pt-10">
            <View className="flex-row w-[90%] h-[11%] shadow-2xl">
                <View className="flex-col bg-[#6c5dd2] px-4 py-4 items-center justify-center rounded-l-md basis-[17%]">
                    <CountryFlag
                        isoCode="gb"
                        size={25}
                        style={{
                            height: 25,
                            width: 25,
                            borderRadius: 25,
                        }}
                    />
                    <Text className="text-white text-lg font-bold">GB</Text>
                </View>
                <View className="bg-white basis-[83%] justify-center space-y-2 pl-6 rounded-r-md">
                    <Text className="text-[#707175]">Enter Reg</Text>
                    <TextInput
                        placeholder="AA00 AAA"
                        style={{ fontSize: 18 }}
                        autoCapitalize={"characters"}
                        onSubmitEditing={(event) =>
                            navigation.navigate("VehicleCheck", {
                                numberPlate: event.nativeEvent.text,
                            })
                        }
                    ></TextInput>
                </View>
            </View>
            <View className="mt-6 w-[90%] h-[380] shadow-xl rounded-lg bg-[#242731]">
                <View className="px-6 py-6">
                    <Text className="text-white text-xl">Search History</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SearchHistory
                        numberPlate="F12 RCB"
                        carModel="2016 Ford Fiesta"
                        date="2 Days Ago"
                    />
                    <SearchHistory
                        numberPlate="DA66 BEl"
                        carModel="2019 Audi TT"
                        date="4 Days Ago"
                    />
                    <SearchHistory
                        numberPlate="SG08 WOY"
                        carModel="2008 Mazda 2"
                        date="4 Days Ago"
                    />
                    <SearchHistory
                        numberPlate="MJ13 XYL"
                        carModel="2013 Ford Fiesta"
                        date="5 Days Ago"
                    />
                </ScrollView>
            </View>
            <View className="mt-6 w-[90%] shadow-xl rounded-lg bg-[#242731]">
                <View className="px-6 py-6">
                    <Text className="text-white text-xl">Purchase History</Text>
                </View>
                <View className="items-center justify-start">
                    <SearchHistory
                        numberPlate="F12 RCB"
                        carModel="2016 Ford Fiesta"
                        date="1 Day Ago"
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
