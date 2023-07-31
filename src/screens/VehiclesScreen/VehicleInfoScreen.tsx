import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RootStackParamList } from "../../types/rootStackParamList";

import { httpsCallable } from "firebase/functions";
import MotSvgComponent from "../../../assets/MotSvg";
import TaxSvgComponent from "../../../assets/TaxSvg";
import { database, functions } from "../../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import schedulePushNotification from "../../tools/notifications/scheduleNotification";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleInfo"
>;

const VehicleInfoScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();

    const { numberPlate, motDate, taxDate, insuranceDate } = route.params;
    const [motPercent, setMotPercent] = useState<any>();
    const [taxPercent, setTaxPercent] = useState<any>();
    const [insurancePercent, setInsurancePercent] = useState<any>();
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [taxInfo, setTaxInfo] = useState<any>();
    const { getUser } = useAuth();

    useEffect(() => {
        dateConverter(motDate, "MOT");
        dateConverter(taxDate, "TAX");
        dateConverter(insuranceDate, "Insurance");

        const vehicleInfo = async () => {
            const getVehicleData = httpsCallable(functions, "getVehicleData");

            const res = await getVehicleData({
                numberPlate: numberPlate,
            });

            setTaxInfo(res.data);
        };

        vehicleInfo();
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

    const onDeletePress = async () => {
        Alert.alert(
            "Deleting a Vehicle",
            `Are you sure you want to remove ${numberPlate} from your garage?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => deleteVehicleFromGarage(),
                },
            ]
        );
    };

    const deleteVehicleFromGarage = async () => {
        const curUser = await getUser();

        const userVehicleDoc = doc(
            database,
            "users",
            curUser?.uid,
            "userVehicles",
            numberPlate
        );
        const userVehicleQuery = await getDoc(userVehicleDoc);
        const userVehicleData = userVehicleQuery.data();

        if (userVehicleData?.motNotification) {
            await Notifications.cancelScheduledNotificationAsync(
                userVehicleData?.motNotification
            );
        }

        if (userVehicleData?.taxNotification) {
            await Notifications.cancelScheduledNotificationAsync(
                userVehicleData?.taxNotification
            );
        }

        if (userVehicleData?.insuranceNotification) {
            await Notifications.cancelScheduledNotificationAsync(
                userVehicleData?.insuranceNotification
            );
        }

        await deleteDoc(
            doc(database, "users", curUser.uid, "userVehicles", numberPlate)
        );

        navigation.goBack();
    };

    const handleUpdateInsuranceDate = async (date: Date) => {
        /* Add submitted date to the userVehicle vehicle doc */
        const curUser = await getUser();

        const userVehicleDoc = doc(
            database,
            "users",
            curUser?.uid,
            "userVehicles",
            numberPlate
        );

        const userVehicleQuery = await getDoc(userVehicleDoc);
        const userVehicleData = userVehicleQuery.data();

        const setInsuranceNotification = await schedulePushNotification(
            numberPlate,
            date
        );

        if (userVehicleData?.insuranceNotification) {
            await Notifications.cancelScheduledNotificationAsync(
                userVehicleData?.insuranceNotification
            );
        }

        await updateDoc(userVehicleDoc, {
            insuranceDate: new Date(date).toISOString(),
            insuranceNotification: setInsuranceNotification,
        });

        setIsDatePickerVisible(false);
    };

    const onMotPress = async () => {
        navigation.navigate("VehicleMot", {
            screen: "VehicleMot",
            params: {
                motStatus: motPercent < 100 ? "Valid" : "Not Valid",
                motExpiry: motDate,
                numberPlate: numberPlate,
            },
        });
    };
    const onTaxPress = async () => {
        navigation.navigate("VehicleTax", {
            screen: "VehicleTax",
            params: {
                numberPlate: numberPlate,
                taxStatus: taxInfo.taxStatus,
                dueDate: taxDate,
                co2Emissions: taxInfo.co2Emissions,
                registered: taxInfo.monthOfFirstRegistration,
                fuelType: taxInfo.fuelType,
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center">
            <View className="px-8 pt-8 pb-12 items-center w-full flex-row justify-between">
                <Text className="text-[#6c5dd2] text-[42px]">
                    {numberPlate}
                </Text>
                <TouchableOpacity onPress={() => onDeletePress()}>
                    <MaterialIcons name="delete" size={28} color="white" />
                </TouchableOpacity>
            </View>
            <View className="w-full items-center space-y-4">
                <TouchableOpacity
                    className="bg-[#242731] w-[90%] h-32 rounded-lg p-4 flex-row items-center space-x-8"
                    onPress={onMotPress}
                >
                    <MotSvgComponent
                        color={motPercent >= 83 ? "#ff754c" : "#fff"}
                        height={48}
                        width={48}
                    />
                    <View className="space-y-4">
                        <Text className="text-[#707175] text-base">
                            MOT Valid Until
                        </Text>
                        <Text className="text-2xl text-white">
                            {new Date(motDate).toDateString()}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="bg-[#242731] w-[90%] h-32 rounded-lg p-4 flex-row items-center space-x-8"
                    onPress={onTaxPress}
                >
                    <TaxSvgComponent
                        height={48}
                        width={48}
                        color={taxPercent >= 83 ? "#ff754c" : "#fff"}
                    />
                    <View className="space-y-4">
                        <Text className="text-[#707175] text-base">
                            Tax Valid Until
                        </Text>
                        <Text className="text-2xl text-white">
                            {taxDate === "SORN"
                                ? taxDate
                                : new Date(taxDate).toDateString()}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View className="bg-[#242731] w-[90%] h-32 rounded-lg p-4 flex-row items-center space-x-8">
                    <Entypo
                        name="shield"
                        size={48}
                        color={insurancePercent >= 83 ? "#ff754c" : "#fff"}
                    />
                    <View className="space-y-4">
                        <View className="flex-row items-center justify-between w-[90%]">
                            <Text className="text-[#707175] text-base mr-auto">
                                Insurance Valid Until
                            </Text>
                            {insuranceDate ? (
                                <TouchableOpacity
                                    className="flex-row bg-[#1e2128] p-2 items-center justify-center rounded-lg space-x-2"
                                    onPress={() =>
                                        setIsDatePickerVisible(
                                            !isDatePickerVisible
                                        )
                                    }
                                >
                                    <Feather
                                        name="edit-3"
                                        size={16}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            ) : (
                                ""
                            )}
                        </View>
                        <Text className="text-2xl text-white">
                            {insurancePercent ? (
                                <Text>
                                    {new Date(insuranceDate).toDateString()}
                                </Text>
                            ) : (
                                <TouchableOpacity
                                    className="flex-row bg-[#1e2128] px-4 py-2 items-center justify-center rounded-lg space-x-2"
                                    onPress={() =>
                                        setIsDatePickerVisible(
                                            !isDatePickerVisible
                                        )
                                    }
                                >
                                    <Text className="text-white">Set Date</Text>
                                    <Feather
                                        name="edit-3"
                                        size={16}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            )}
                        </Text>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleUpdateInsuranceDate}
                            onCancel={() => setIsDatePickerVisible(false)}
                            display={"inline"}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VehicleInfoScreen;
