import React from "react";
import { Text, View } from "react-native";

type Props = {
    emissions: string;
    band: string;
    isRating?: boolean;
};

const colours: any = {
    A: {
        backgroundColor: "bg-[#02A64F]",
        borderColor: "border-[#02A64F]",
        size: "w-1/5",
    },
    BC: {
        backgroundColor: "bg-[#4EB748]",
        borderColor: "border-[#4EB748]",
        size: "w-[30%]",
    },
    DE: {
        backgroundColor: "bg-[#A6CE39]",
        borderColor: "border-[#A6CE39]",
        size: "w-2/5",
    },
    FG: {
        backgroundColor: "bg-[#D1C51C]",
        borderColor: "border-[#D1C51C]",
        size: "w-1/2",
    },
    HI: {
        backgroundColor: "bg-[#FCB916]",
        borderColor: "border-[##FCB916]",
        size: "w-3/5",
    },
    JK: {
        backgroundColor: "bg-[#F58320]",
        borderColor: "border-[#F58320]",
        size: "w-[70%]",
    },
    LM: {
        backgroundColor: "bg-red-600",
        borderColor: "border-red-600",
        size: "w-4/5",
    },
};

const TaxTableRow = ({ emissions, band, isRating }: Props) => {
    return (
        <View
            className={`items-center justify-center flex-row ${
                isRating
                    ? `bg-[#33343b] ${colours[band].borderColor} border-l-4`
                    : ""
            } py-0.5`}
        >
            <Text
                className="text-white font-bold basis-[20%] text-center"
                maxFontSizeMultiplier={1.2}
            >
                {emissions}
            </Text>
            <View className="w-full items-center h-7 justify-center basis-[70%]">
                <View className="h-3 bg-[#e3dede] w-full rounded-2xl">
                    <View
                        className={`${colours[band].size} rounded-2xl ${colours[band].backgroundColor} h-3`}
                    ></View>
                </View>
            </View>
            <Text className="text-white font-bold basis-[10%] text-center">
                {band}
            </Text>
        </View>
    );
};

export default TaxTableRow;
