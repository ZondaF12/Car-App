import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MotSvgComponent from "../../assets/MotSvg";
import { RootStackParamList } from "../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleMot"
>;

type Props = {
    motDate: string;
    motTestStatus: string;
    totalMilage: number;
    latestTest: boolean;
    milageDifference: string;
    motTestNumber: number;
    expiryDate: string;
    comments: string[];
};

const MotField = ({
    motDate,
    motTestStatus,
    totalMilage,
    latestTest,
    milageDifference,
    motTestNumber,
    expiryDate,
    comments,
}: Props) => {
    const navigation = useNavigation<NavigationProp>();
    const [formattedMotDate, setFormattedMotDate] = useState("");
    const [formattedMotExpiryDate, setFormattedMotExpiryDate] = useState("");

    useEffect(() => {
        const formatDate = async (
            dateToFormat: string,
            setState: React.Dispatch<React.SetStateAction<string>>
        ) => {
            let date: string[] | string = dateToFormat.split(" ");
            date = date[0].replaceAll(".", "-");
            const newDate = new Date(date).toDateString();

            setState(newDate);
        };

        formatDate(motDate, setFormattedMotDate);
        formatDate(expiryDate, setFormattedMotExpiryDate);
    }, [totalMilage]);
    return (
        <TouchableOpacity
            className={`w-full ${
                motTestStatus === "PASSED" ? "bg-green-500" : "bg-red-500"
            } h-16 rounded-md flex-row mt-4 ${latestTest ? "" : "opacity-50"}`}
            onPress={() =>
                navigation.navigate("VehicleMotResults", {
                    testNumber: motTestNumber,
                    motDate: formattedMotDate,
                    testResult: motTestStatus,
                    expiryDate: formattedMotExpiryDate,
                    milage: totalMilage,
                    milageDifference: milageDifference,
                    advisories: comments,
                })
            }
        >
            <View className="justify-center items-center px-4 ">
                <MotSvgComponent
                    color={motTestStatus === "PASSED" ? "#02A64F" : "#D90000"}
                    height={50}
                    width={50}
                />
            </View>
            <View className="justify-center pr-4">
                <Text className="text-base" maxFontSizeMultiplier={1.2}>
                    {formattedMotDate}
                </Text>
                <Text className="opacity-50" maxFontSizeMultiplier={1.2}>
                    {motTestStatus}
                </Text>
            </View>
            <View className="justify-center ml-auto px-4">
                <Text className="text-base" maxFontSizeMultiplier={1.2}>
                    {totalMilage} mi
                </Text>
                <Text className="opacity-50" maxFontSizeMultiplier={1.2}>
                    {motTestStatus === "PASSED"
                        ? `+${milageDifference} mi`
                        : ""}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default MotField;
