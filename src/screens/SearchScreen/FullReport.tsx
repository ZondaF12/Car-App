import { REVENUECAT_APPLE } from "@env";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Purchases from "react-native-purchases";
import { auth, database } from "../../../firebase";
import FullCheckList from "../../components/FullCheckList";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "FullReport"
>;

const FullReport = ({ route }: any) => {
    const { numberPlate } = route.params;

    const handlePurchaseReport = async () => {
        await Purchases.configure({ apiKey: REVENUECAT_APPLE });
        const offerings = await Purchases.getOfferings();
        // const purchaserInfo = await Purchases.purchasePackage(
        //     offerings.all.REPORT.availablePackages[0]
        // );
        const purchaserInfo = await Purchases.purchaseProduct("vehicle_report");
        console.log(purchaserInfo);

        const curUser = auth.currentUser!;
        await setDoc(
            doc(database, "users", curUser.uid, "purchases", numberPlate),
            {
                purchaseDate:
                    purchaserInfo.customerInfo.allPurchaseDates.vehicle_report,
            }
        );
    };

    return (
        <View className="bg-[#1e2128]">
            <View>
                <View className="px-4 pt-8">
                    <Text className="text-white font-bold text-3xl">
                        Full Vehicle Report
                    </Text>
                    <Text className="text-white text-base pt-2">
                        Get a report to avoid bad deals, sell faster, or learn
                        if your vehicle’s safe.
                    </Text>
                </View>
                <View className="px-4 pt-4">
                    <TouchableOpacity
                        className="w-full bg-[#6c5dd2] items-center justify-center p-4"
                        onPress={handlePurchaseReport}
                    >
                        <Text className="text-white font-bold">
                            Purchase Report
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text className="p-4 text-white font-bold text-xl">
                    What's Included in a Report?
                </Text>
            </View>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <View className="w-full mb-72">
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
        </View>
    );
};

export default FullReport;
