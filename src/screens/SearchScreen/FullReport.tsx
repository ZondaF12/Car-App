import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FullCheckList from "../../components/FullCheckList";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "FullReport"
>;

const FullReport = () => {
    return (
        <View>
            <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                className=" px-4 relative bg-[#1e2128]"
            >
                <View className="w-full mb-32">
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
            <TouchableOpacity className="absolute inset-x-0 bottom-8 left-4 right-4 h-16 bg-[#6c5dd2] rounded-full items-center justify-center">
                <Text className="text-center text-lg font-bold text-white">
                    Purchase Full Report
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default FullReport;
