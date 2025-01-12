import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RootStackParamList } from "../../types/rootStackParamList";

import { ScrollView } from "react-native-gesture-handler";
import TaxTable from "../../components/TaxTable";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleTax"
>;

const taxPriceOld: any = {
    100: "£0",
    110: "£20",
    120: "£30",
    130: "£135",
    140: "£165",
    150: "£180",
    165: "£220",
    175: "£265",
    185: "£290",
    200: "£330",
    225: "£360",
    255: "£615",
    1000: "£630",
};

const VehicleTaxScreen = ({ route }: any) => {
    const [newDate, setNewDate] = useState("");
    const [dayDifference, setDayDifference] = useState("");
    const [taxPrice, setTaxPrice] = useState<number | undefined>();
    const [isNewTax, setIsNewTax] = useState(false);
    const { taxStatus, dueDate, co2Emissions, registered, fuelType } =
        route.params;

    useEffect(() => {
        const dateConverter = async (date: string) => {
            const newDate = new Date(date);
            let formattedDate = await Promise.resolve(newDate.toDateString());

            if (!date || date === "SORN") {
                formattedDate = "-";
            }
            setNewDate(formattedDate);
        };

        const dateDifference = async (date: string) => {
            const date1 = new Date(date);
            const date2 = new Date();

            const difference = date1.getTime() - date2.getTime();
            let days: any = await Promise.resolve(
                Math.ceil(difference / (1000 * 3600 * 24))
            );

            setDayDifference(days);
        };

        const findTaxPrice = async (emission: number, registered: string) => {
            if (isNaN(emission)) {
                setTaxPrice(undefined);
                return;
            }

            const cutOffDate = new Date("2017-03");
            const registeredDate = new Date(registered);

            let taxPricing;
            if (registeredDate.getTime() < cutOffDate.getTime()) {
                for (let key of Object.keys(taxPriceOld)) {
                    if (emission <= +key) {
                        taxPricing = await Promise.resolve(taxPriceOld[key]);
                        break;
                    }
                }
            } else {
                setIsNewTax(true);
                if (co2Emissions > 0 && fuelType != "ELECTRICITY") {
                    if (fuelType === "PETROL" || fuelType === "DIESEL") {
                        taxPricing = "£180";
                    } else {
                        taxPricing = "£170";
                    }
                } else {
                    taxPricing = "£0";
                }
            }

            setTaxPrice(taxPricing);
        };

        findTaxPrice(co2Emissions, registered);
        dateConverter(dueDate);
        dateDifference(dueDate);
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-[#1e2128] w-full"
            contentContainerStyle={{ alignItems: "center" }}
        >
            <View className="w-[90%] mt-8">
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Tax Status</Text>
                    <Text className="text-white text-base">{taxStatus}</Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Due Date</Text>
                    <Text className="text-white text-base">{newDate}</Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">
                        {+dayDifference > 0 ? "Expires In" : "Expired"}
                    </Text>
                    <Text className="text-white text-base">
                        {+dayDifference > 0
                            ? `${dayDifference} Days`
                            : +dayDifference < 0
                            ? `${+dayDifference * -1} Days Ago`
                            : "-"}
                    </Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4 mt-5">
                    <Text className="text-white text-base">12 Month Tax</Text>
                    <Text className="text-white text-base">
                        {taxPrice
                            ? isNewTax
                                ? `${taxPrice}*`
                                : taxPrice
                            : "-"}
                    </Text>
                </View>
            </View>
            <View className="w-[90%] bg-[#33343b] p-2 mt-4">
                <Text className="text-white font-bold">CO2 Emissions</Text>
            </View>
            <TaxTable emissions={co2Emissions} />
            <View className="flex-row justify-between w-[90%] px-4 py-2 bg-[#33343b]">
                <Text className="text-white text-base">CO2 Emissions</Text>
                <Text className="text-white text-base">
                    {co2Emissions >= 0 ? co2Emissions + " g/km" : "-"}
                </Text>
            </View>
            <Text className="text-white mt-4 text-xs text-left w-[90%] px-4 font-extralight">
                {isNewTax
                    ? "*As of March 2017, if your new car had a list price of £40,000 or more, you’ll pay additional rate tax, or premium car tax, which is £390, or £570 per year in total (£180 + £390). You’ll pay this rate for five years (from the second time the vehicle is taxed)."
                    : ""}
            </Text>
        </ScrollView>
    );
};

export default VehicleTaxScreen;
