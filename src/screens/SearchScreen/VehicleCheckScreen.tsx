import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import TableFields from "../../components/TableFields";
import addToSearchHistory from "../../tools/addToSearchHistory";
import { getVehicleDetails } from "../../tools/getVehicleDetails";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

const VehicleCheckScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const [vehicleDetails, setVehicleDetails] = useState<any>();
    const vehicleRegPlate = route.params.numberPlate.replace(/\s/g, "");

    useEffect(() => {
        const onGetVehicleDetails = async () => {
            try {
                const res = await getVehicleDetails(vehicleRegPlate);
                setVehicleDetails(res);
            } catch (e: any) {
                navigation.goBack();
                Alert.alert(
                    `${vehicleRegPlate} is not a valid number plate`,
                    e.message
                );
            }
        };

        onGetVehicleDetails();
    }, [vehicleRegPlate]);

    useEffect(() => {
        const checkSearchHistory = async () => {
            await addToSearchHistory(
                vehicleRegPlate,
                vehicleDetails.make,
                vehicleDetails.yearOfManufacture
            );
        };

        checkSearchHistory();
    }, [vehicleDetails]);

    useEffect(() => {
        navigation.setOptions({ title: "TEST" });
    }, []);

    if (vehicleDetails === "Request Failed") {
        navigation.goBack();
        Alert.alert(
            "Invalid Number Plate",
            "Sorry, this vehicle could not be found. Please check and try again",
            [{ text: "OK" }]
        );
    }

    if (!vehicleDetails) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    const newCarMotDate = (registeredDate: Date) => {
        const currentDate = new Date();
        const regDate = new Date(registeredDate);
        const motDate = new Date(
            regDate.setFullYear(regDate.getFullYear() + 3)
        );

        return motDate > currentDate;
    };

    return (
        <View className="flex-1 bg-[#1e2128]">
            <View className="items-center">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="w-screen">
                        <TableFields title="Make" data={vehicleDetails.make} />
                        {/* <TableFields
                            title="Model"
                            data={vehicleDetails.model}
                        /> */}
                        <TableFields
                            title="Year"
                            data={vehicleDetails.yearOfManufacture}
                        />
                        <TableFields
                            title="Colour"
                            data={vehicleDetails.colour}
                        />
                        <TableFields
                            title="Engine Size"
                            data={`${vehicleDetails.engineCapacity} cc`}
                        />
                        <TableFields
                            title="CO2 Emissions"
                            data={`${vehicleDetails.co2Emissions} g/km`}
                        />
                        <TableFields
                            title="Fuel Type"
                            data={vehicleDetails.fuelType}
                        />
                        {/* <TableFields
                            title="Transmission"
                            data={vehicleDetails.transmission}
                        /> */}
                        <TableFields
                            title="First Registered"
                            data={vehicleDetails.monthOfFirstRegistration}
                        />
                        <TableFields
                            title="Type Approval"
                            data={vehicleDetails.typeApproval}
                        />
                        <TableFields
                            title="Wheel Plan"
                            data={vehicleDetails.wheelplan}
                        />
                        <TableFields
                            title="Euro Status"
                            data={
                                vehicleDetails.euroStatus
                                    ? vehicleDetails.euroStatus
                                    : "Unknown"
                            }
                            lastRow
                        />
                    </View>
                </ScrollView>
            </View>
            {/* <BottomSheet
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
                        </Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ alignItems: "center" }}
                    className="pt-6 px-4 relative"
                    onLayout={() => {
                        if (sheetIndex != undefined)
                            setIsBottomSheetLoaded(true);
                    }}
                >
                    <View className="border rounded-md w-full mb-32">
                        <View className="p-4 border-b">
                            <Text className="text-base font-bold">
                                Full HPI Vehicle Check
                            </Text>
                        </View>
                        <FullCheckList
                            icon="police-badge-outline"
                            header="Stolen"
                            description="Is the car recorded as stolen on the police national computer?"
                        />
                        <FullCheckList
                            icon="book-open-outline"
                            header="Finance"
                            description="Are there any outstanding loans and finance
                            agreements secured on the car?"
                        />
                        <FullCheckList
                            icon="draw-pen"
                            header="Written Off"
                            description="Has the car been in a serious accident and written off by an insurance company?"
                        />
                        <FullCheckList
                            icon="cash"
                            header="Valuation*"
                            description="4 market values including: trade-in, private sale, forecourt value and price at new. Additionally, we’ll tell you the car’s past and future values – you won’t find this information anywhere else. *Provided where available"
                        />
                        <FullCheckList
                            icon="account-supervisor-outline"
                            header="Previous Owners"
                            description="How many previous owners are registered on the logbook?"
                        />
                        <FullCheckList
                            icon="car-cog"
                            header="Plate Changes"
                            description="Are there any previous number plate changes on the car that might be hiding a murky past?"
                        />
                        <FullCheckList
                            icon="airplane"
                            header="Import/Export"
                            description="Has the car been imported or exported?"
                        />
                        <FullCheckList
                            icon="tools"
                            header="Scrapped"
                            description="Is the car registered as scrapped with the DVLA?"
                        />
                        <FullCheckList
                            icon="archive-check"
                            header="VIN/Chassis Check"
                            description="We check for any issues that might be recorded against the ‘Vehicle Identification Number’ that might not be recorded against the number plate."
                        />
                        <FullCheckList
                            icon="archive-search"
                            header="Logbook/VIN Match"
                            description="We check if the Logbook and VIN numbers match so you can avoid buying a stolen car."
                        />
                        <FullCheckList
                            icon="fuel"
                            header="Estimated Fuel Costs"
                            description="Forecast fuel costs for comparison purposes. Costs are based on 12,000 miles annually."
                        />
                        <FullCheckList
                            icon="more"
                            header="...And much more!"
                            description="Up to 80 data points in total!"
                        />
                    </View>
                </ScrollView>
            </BottomSheet> */}
        </View>
    );
};

export default VehicleCheckScreen;
