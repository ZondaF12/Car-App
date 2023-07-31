import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../../types/rootStackParamList";

import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase";
import MotField from "../../components/MotField";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleMot"
>;

const VehicleMotScreen = ({ route }: any) => {
    const { motStatus, motExpiry, numberPlate } = route.params;
    const [motTests, setMotTests] = useState<any>([]);
    const [dayDifference, setDayDifference] = useState("");
    const [carMotDate, setCarMotDate] = useState("");

    useEffect(() => {
        const checkMot = async () => {
            const getMotDetails = httpsCallable(functions, "getMotDetails");

            const res: any = await getMotDetails({
                numberPlate,
            });

            setMotTests(res.data[0].motTests);

            if (!motExpiry) {
                const newCarDate = new Date(
                    res[0].motTestExpiryDate
                ).toDateString();
                setCarMotDate(newCarDate);
            } else {
                const motDate = new Date(motExpiry).toDateString();
                setCarMotDate(motDate);
            }
        };

        checkMot();
    }, []);

    useEffect(() => {
        const addMilageDifference = async () => {
            let previousMilage;
            for (let i = motTests.length - 1; i >= 0; i--) {
                if (i === motTests.length - 1) {
                    motTests[i]["milageDifference"] =
                        motTests[i]["odometerValue"];
                    previousMilage = motTests[i]["odometerValue"];
                } else {
                    if (motTests[i]["testResult"] === "PASSED") {
                        motTests[i]["milageDifference"] =
                            motTests[i]["odometerValue"] - previousMilage;

                        previousMilage = motTests[i]["odometerValue"];
                    }
                }
            }
        };

        addMilageDifference();
    }, [motTests]);

    useEffect(() => {
        const dateDifference = async () => {
            const date1 = new Date(carMotDate);
            const date2 = new Date();

            const difference = date1.getTime() - date2.getTime();
            let days: any = await Promise.resolve(
                Math.ceil(difference / (1000 * 3600 * 24))
            );

            setDayDifference(days);
        };

        dateDifference();
    }, [carMotDate]);

    if (!carMotDate) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center w-full">
            <View className="w-[90%] mt-8">
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">MOT Status</Text>
                    <Text className="text-white text-base">{motStatus}</Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Due Date</Text>
                    <Text className="text-white text-base">{carMotDate}</Text>
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
                    <Text className="text-white text-base">
                        MOT Test Pricing
                    </Text>
                    <Text className="text-white text-base">£54</Text>
                </View>
            </View>
            <View className="w-[90%] bg-[#33343b] p-2 mt-4">
                <Text className="text-white font-bold">MOT Mileage Data</Text>
            </View>
            <ScrollView
                style={{ width: "90%" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mt-4">
                    {motTests ? (
                        motTests.map((motTest: any, i: any) => (
                            <MotField
                                motDate={motTest.completedDate}
                                motTestStatus={motTest.testResult}
                                totalMilage={motTest.odometerValue}
                                latestTest={i === 0}
                                milageDifference={motTest.milageDifference}
                                motTestNumber={motTest.motTestNumber}
                                expiryDate={motTest.expiryDate}
                                comments={motTest.rfrAndComments}
                            />
                        ))
                    ) : (
                        <TouchableOpacity className="items-center justify-center">
                            <Text className="text-white text-lg">
                                No MOT Tests Completed
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VehicleMotScreen;
