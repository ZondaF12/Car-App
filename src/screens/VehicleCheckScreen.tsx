import {
    View,
    Text,
    ActivityIndicator,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { getVehicleDetails } from "../tools/getVehicleDetails";
import BottomSheet from "@gorhom/bottom-sheet";
import { getVehicleImage } from "../tools/getVehicleImage";
import TableFields from "../components/TableFields";
import { useNavigation } from "@react-navigation/native";
import ActionRow from "../components/ActionRow";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

/* Add https://reactnative.dev/docs/refreshcontrol */

const VehicleCheckScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["15%", "85%"], []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    const vehicleDetails: any = getVehicleDetails(route.params.numberPlate);
    const vehicleImage: any = getVehicleImage(route.params.numberPlate);

    if (vehicleDetails?._j === "Request Failed") {
        navigation.goBack();
        Alert.alert(
            "Invalid Number Plate",
            "Sorry, this vehicle could not be found. Please check and try again",
            [{ text: "OK" }]
        );
    }

    if (!vehicleDetails?._j) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    console.log(vehicleDetails);

    const newCarMotDate = (registeredDate: Date) => {
        const currentDate = new Date();
        const regDate = new Date(registeredDate);
        const motDate = new Date(
            regDate.setFullYear(regDate.getFullYear() + 3)
        );

        return motDate > currentDate;
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128]">
            <View className="items-center h-[86%]">
                <View className="bg-white w-52 items-center justify-center h-12 rounded-lg top-3 z-20 shadow-2xl">
                    <Text className="text-2xl font-bold uppercase">
                        {route.params.numberPlate}
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={{ alignItems: "center" }}
                    showsVerticalScrollIndicator={false}
                >
                    {vehicleImage._j ? (
                        <Image
                            className="mt-10"
                            source={{ uri: vehicleImage._j }}
                            style={{
                                height: 130,
                                width: 350,
                                marginBottom: 20,
                            }}
                        />
                    ) : (
                        <Image
                            className="mt-10"
                            source={require("../../assets/car.png")}
                            style={{
                                height: 130,
                                width: 350,
                                marginBottom: 20,
                            }}
                        />
                    )}

                    <ActionRow
                        title="Tax"
                        isValid={
                            vehicleDetails._j.taxStatus === "Taxed" ||
                            vehicleDetails._j.taxStatus === "SORN"
                                ? true
                                : false
                        }
                        api={vehicleDetails._j}
                    />
                    <ActionRow
                        title="Mot"
                        isValid={
                            vehicleDetails._j.motStatus === "Valid"
                                ? true
                                : vehicleDetails._j.motStatus ===
                                  "No details held by DVLA"
                                ? newCarMotDate(
                                      vehicleDetails?._j
                                          ?.monthOfFirstRegistration
                                  )
                                : false
                        }
                        api={vehicleDetails._j}
                    />

                    <View className="mt-5 rounded-lg w-full border-2 border-[#33343b]">
                        <View
                            className={`rounded-t-lg h-12 items-center flex-row justify-center px-8 border-b-2 border-[#33343b]`}
                        >
                            <Text className="text-white text-lg font-bold">
                                Basic Vehicle Details
                            </Text>
                        </View>
                        <TableFields
                            title="Make"
                            data={vehicleDetails._j.make}
                        />
                        {/* <TableFields
                            title="Model"
                            data={vehicleDetails._j.model}
                        /> */}
                        <TableFields
                            title="Year"
                            data={vehicleDetails._j.yearOfManufacture}
                        />
                        <TableFields
                            title="Colour"
                            data={vehicleDetails._j.colour}
                        />
                        <TableFields
                            title="Engine Size"
                            data={`${vehicleDetails._j.engineCapacity} cc`}
                        />
                        <TableFields
                            title="CO2 Emissions"
                            data={`${vehicleDetails._j.co2Emissions} g/km`}
                        />
                        <TableFields
                            title="Fuel Type"
                            data={vehicleDetails._j.fuelType}
                        />
                        {/* <TableFields
                            title="Transmission"
                            data={vehicleDetails._j.transmission}
                        /> */}
                        <TableFields
                            title="First Registered"
                            data={vehicleDetails._j.monthOfFirstRegistration}
                        />
                        <TableFields
                            title="Type Approval"
                            data={vehicleDetails._j.typeApproval}
                        />
                        <TableFields
                            title="Wheel Plan"
                            data={vehicleDetails._j.wheelplan}
                        />
                        <TableFields
                            title="Euro Status"
                            data={
                                vehicleDetails._j.euroStatus
                                    ? vehicleDetails._j.euroStatus
                                    : "Unknown"
                            }
                            lastRow
                        />
                    </View>
                </ScrollView>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View className="items-center space-y-2 -top-4">
                    <Text className="pt-6 text-2xl font-bold tracking-[1]">
                        Full Report
                    </Text>
                    <View className="bg-yellow-300 px-2 py-1 rounded-md">
                        <Text className="font-bold text-base">
                            WMWMF72060TL34222
                            {/* {vehicleDetails._j.vin} */}
                        </Text>
                    </View>
                </View>
                <View></View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default VehicleCheckScreen;
