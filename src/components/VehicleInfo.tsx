import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import MotSvgComponent from "../../assets/MotSvg";
import TaxSvgComponent from "../../assets/TaxSvg";

type Props = {
    numberPlate: string;
    make: string;
    model?: string;
    motDate?: any;
    taxDate?: any;
    insuranceDate?: any;
    onClick: any;
};

const VehicleInfo = ({
    numberPlate,
    make,
    model,
    motDate,
    taxDate,
    insuranceDate,
    onClick,
}: Props) => {
    const [motPercent, setMotPercent] = useState<any>();
    const [taxPercent, setTaxPercent] = useState<any>();
    const [insurancePercent, setInsurancePercent] = useState<any>();

    useEffect(() => {
        dateConverter(motDate, "MOT");
        dateConverter(taxDate, "TAX");
        dateConverter(insuranceDate, "Insurance");
    }, []);

    const dateConverter = async (expiryDate: Date, type: string) => {
        const currentDate: any = new Date();
        const endDate: any = new Date(expiryDate);

        let startDate: any = new Date(expiryDate);
        startDate = startDate.setFullYear(startDate.getFullYear() - 1);

        const q = currentDate.getTime() - startDate;
        const d = endDate - startDate;

        if (type === "MOT") {
            setMotPercent(Math.round((q / d) * 100));
        } else if (type === "TAX") {
            setTaxPercent(Math.round((q / d) * 100));
        } else {
            setInsurancePercent(Math.round((q / d) * 100));
        }
    };

    return (
        <View className="h-48 shadow-xl rounded-lg bg-[#242731] mb-4">
            <View className="flex-row items-center basis-[60%]">
                <View className="px-4 items-start py-2 mr-auto w-[85%]">
                    <Text
                        className="text-[#6c5dd2] text-3xl uppercase font-bold"
                        maxFontSizeMultiplier={1.1}
                    >
                        {numberPlate}
                    </Text>
                    <Text
                        className="text-white text-xl uppercase font-bold"
                        maxFontSizeMultiplier={1.1}
                    >
                        {make}
                    </Text>
                    <Text
                        className="text-[#707175] text-xl uppercase font-bold truncate"
                        maxFontSizeMultiplier={1.1}
                        numberOfLines={1}
                    >
                        {model}
                    </Text>
                </View>
                <View className="px-4">
                    <TouchableOpacity
                        className="bg-[#707175] w-12 h-12 opacity-50 items-center justify-center rounded-xl ml-auto"
                        onPress={onClick}
                    >
                        <Entypo name="chevron-right" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex-row justify-between items-center px-8 basis-[40%]">
                <ProgressCircle
                    percent={
                        motPercent && motPercent < 100 ? 100 - motPercent : 100
                    }
                    radius={25}
                    borderWidth={2}
                    color={motPercent >= 83.562 ? "#ff754c" : "#26fc90"}
                    shadowColor="#707175"
                    bgColor="#242731"
                >
                    <MotSvgComponent color={"#fff"} height={24} width={24} />
                </ProgressCircle>
                <ProgressCircle
                    percent={
                        taxPercent && taxPercent <= 100 ? 100 - taxPercent : 100
                    }
                    radius={25}
                    borderWidth={2}
                    color={taxPercent >= 83.562 ? "#ff754c" : "#26fc90"}
                    shadowColor="#707175"
                    bgColor="#242731"
                >
                    <TaxSvgComponent color={"#fff"} height={28} width={28} />
                </ProgressCircle>
                <ProgressCircle
                    percent={
                        insurancePercent && insurancePercent <= 100
                            ? 100 - insurancePercent
                            : 100
                    }
                    radius={25}
                    borderWidth={2}
                    color={insurancePercent >= 83.562 ? "#ff754c" : "#26fc90"}
                    shadowColor="#707175"
                    bgColor="#242731"
                >
                    <Entypo name="shield" size={24} color={"#fff"} />
                </ProgressCircle>
            </View>
        </View>
    );
};

export default VehicleInfo;
