import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProgressCircle from "react-native-progress-circle";
import MotSvgComponent from "../../assets/MotSvg";
import TaxSvgComponent from "../../assets/TaxSvg";

type Props = {
    numberPlate: string;
    motDate?: any;
    taxDate?: any;
    insuranceDate?: any;
    onClick: any;
};

const VehicleInfoFleet = ({
    numberPlate,
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
        <TouchableOpacity
            className="h-[70] shadow-lg rounded-lg bg-[#242731] mb-4 justify-center px-4"
            onPress={onClick}
        >
            <View className="flex-row items-center justify-between">
                <Text
                    className="text-[#6c5dd2] text-3xl uppercase font-bold text-center"
                    maxFontSizeMultiplier={1.1}
                >
                    {numberPlate}
                </Text>
                <View className="flex-row space-x-4">
                    <View>
                        <ProgressCircle
                            percent={
                                motPercent && motPercent < 100
                                    ? 100 - motPercent
                                    : 100
                            }
                            radius={25}
                            borderWidth={2}
                            color={motPercent >= 83 ? "#ff754c" : "#fff"}
                            shadowColor="#707175"
                            bgColor="#242731"
                        >
                            <MotSvgComponent
                                color={motPercent >= 83 ? "#ff754c" : "#fff"}
                                height={24}
                                width={24}
                            />
                        </ProgressCircle>
                    </View>
                    <View>
                        <ProgressCircle
                            percent={
                                taxPercent && taxPercent <= 100
                                    ? 100 - taxPercent
                                    : 100
                            }
                            radius={25}
                            borderWidth={2}
                            color={taxPercent >= 83 ? "#ff754c" : "#fff"}
                            shadowColor="#707175"
                            bgColor="#242731"
                        >
                            <TaxSvgComponent
                                color={motPercent >= 83 ? "#ff754c" : "#fff"}
                                height={24}
                                width={24}
                            />
                        </ProgressCircle>
                    </View>
                    <View>
                        <ProgressCircle
                            percent={
                                insurancePercent && insurancePercent <= 100
                                    ? 100 - insurancePercent
                                    : 100
                            }
                            radius={25}
                            borderWidth={2}
                            color={insurancePercent >= 83 ? "#ff754c" : "#fff"}
                            shadowColor="#707175"
                            bgColor="#242731"
                        >
                            <Entypo
                                name="shield"
                                size={24}
                                color={
                                    insurancePercent >= 83 ? "#ff754c" : "#fff"
                                }
                            />
                        </ProgressCircle>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default VehicleInfoFleet;
