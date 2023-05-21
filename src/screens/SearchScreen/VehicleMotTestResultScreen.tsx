import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleMotResults"
>;

type Props = {
    testNumber: number;
    motDate: string;
    testResult: "PASSED" | "FAILED";
    expiryDate: string;
    milage: number;
    milageDifference: string;
    advisories: any;
};

const VehicleMotTestResultScreen = ({ route }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [testAdvisories, setTestAdvisories] = useState([]);
    const [testFails, setTestFails] = useState([]);
    const [testPrs, setTestPrs] = useState([]);

    const {
        testNumber,
        motDate,
        testResult,
        expiryDate,
        milage,
        milageDifference,
        advisories,
    }: Props = route.params;

    useEffect(() => {
        const setMotTestTypes = async () => {
            if (advisories.length > 0) {
                setTestAdvisories([]);
                setTestFails([]);
                setTestPrs([]);

                for (let test in advisories) {
                    switch (advisories[test].type) {
                        case "PRS":
                            setTestPrs((testPrs) =>
                                testPrs.concat(advisories[test].text)
                            );
                            break;
                        case "FAIL":
                            setTestFails((testFails) =>
                                testFails.concat(advisories[test].text)
                            );
                            break;
                        case "ADVISORY":
                            setTestAdvisories((testAdvisories) =>
                                testAdvisories.concat(advisories[test].text)
                            );
                            break;
                    }
                }
            }
        };
        setMotTestTypes();
    }, [testNumber]);

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center w-full">
            <View className="my-10">
                <Text className="items-center justify-center text-white text-center text-2xl font-bold">
                    MOT Details
                </Text>
            </View>
            <View className="w-[90%]">
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Test Number</Text>
                    <Text className="text-white text-base">{testNumber}</Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Completed Date</Text>
                    <Text className="text-white text-base">{motDate}</Text>
                </View>
                <View className="h-8 items-center flex-row justify-between px-4">
                    <Text className="text-white text-base">Test Result</Text>
                    <Text className="text-white text-base">{testResult}</Text>
                </View>
                {testResult === "PASSED" ? (
                    <View>
                        <View className="h-8 items-center flex-row justify-between px-4 mt-5">
                            <Text className="text-white text-base">
                                Expiry Date
                            </Text>
                            <Text className="text-white text-base">
                                {expiryDate}
                            </Text>
                        </View>
                        <View className="h-8 items-center flex-row justify-between px-4">
                            <Text className="text-white text-base">
                                Odometer Value
                            </Text>
                            <Text className="text-white text-base">
                                {milage} mi
                            </Text>
                        </View>
                        <View className="h-8 items-center flex-row justify-between px-4">
                            <Text className="text-white text-base">
                                Since Last Pass
                            </Text>
                            <Text className="text-white text-base">
                                +{milageDifference} mi
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View className="h-8 items-center flex-row justify-between px-4 mt-5">
                        <Text className="text-white text-base">
                            Odometer Value
                        </Text>
                        <Text className="text-white text-base">
                            {milage} mi
                        </Text>
                    </View>
                )}
            </View>
            <View className="w-[90%] bg-[#33343b] p-2 mt-4">
                <Text className="text-white font-bold">Notices</Text>
            </View>
            <ScrollView
                style={{ width: "90%" }}
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                {advisories.length > 0 ? (
                    <View className="mt-4 w-full space-y-4">
                        {testFails.length > 0 ? (
                            <View className="w-full bg-red-500 p-2 rounded-lg shadow-xl">
                                <Text className="text-white font-bold text-lg">
                                    Reason(s) for failure
                                </Text>
                                {testFails.map((failedComments: any) => (
                                    <View className="pt-2">
                                        <Text className="text-white text-sm">
                                            - {failedComments}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            ""
                        )}

                        {testPrs.length > 0 ? (
                            <View className="w-full p-2 bg-orange-400 rounded-lg shadow-xl">
                                <Text className="text-white font-bold text-lg">
                                    Rectifiable issue(s)
                                </Text>
                                {testPrs.map((prsComments: any) => (
                                    <View className="pt-2">
                                        <Text className="text-white text-sm">
                                            - {prsComments}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            ""
                        )}

                        {testAdvisories.length > 0 ? (
                            <View className="w-full bg-[#242731] p-2 rounded-lg shadow-xl">
                                <Text className="text-white font-bold text-lg">
                                    Advisory notice item(s)
                                </Text>
                                {testAdvisories.map((advisoryComments: any) => (
                                    <View className="pt-2">
                                        <Text className="text-white text-sm">
                                            - {advisoryComments}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            ""
                        )}
                    </View>
                ) : (
                    <View className="mt-4 w-full space-y-4">
                        <Text className="text-white text-lg text-center">
                            No Advisories
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default VehicleMotTestResultScreen;
