import {
    View,
    Text,
    TextInput,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
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
        <SafeAreaView className="flex-1 bg-[#16242c] items-center justify-center">
            <View className="flex-row">
                <View className="flex-col bg-[#0f7fe5] px-4 py-4 items-center justify-center rounded-l-md">
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
                <View className="bg-white w-64 justify-center space-y-2 pl-6 rounded-r-md">
                    <Text>Enter Reg</Text>
                    <TextInput
                        placeholder="AA00 AAA"
                        style={{ fontSize: 15 }}
                        autoCapitalize={"characters"}
                        onSubmitEditing={(event) =>
                            navigation.navigate("VehicleCheck", {
                                numberPlate: event.nativeEvent.text,
                            })
                        }
                    ></TextInput>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
