import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import MotSvgComponent from "../../../assets/MotSvg";
import { auth, database } from "../../../firebase";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleInfo"
>;

const VehicleInfoScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();

    const { numberPlate, motDate, taxDate } = route.params;
    const [motPercent, setMotPercent] = useState<any>();
    const [taxPercent, setTaxPercent] = useState<any>();
    const [insurancePercent, setInsurancePercent] = useState<any>();
    const [insuranceDate, setInsuranceDate] = useState<any>();

    useEffect(() => {
        dateConverter(motDate, "MOT");
        dateConverter(taxDate, "TAX");
    }, []);

    const dateConverter = async (expiryDate: Date, type: string) => {
        const currentDate: any = new Date();
        const endDate: any = new Date(expiryDate);

        let startDate: any = new Date(expiryDate);
        startDate = startDate.setFullYear(startDate.getFullYear() - 1);

        const q = Math.abs(currentDate.getTime() - startDate);
        const d = Math.abs(endDate - startDate);

        if (type === "MOT") {
            setMotPercent(Math.round((q / d) * 100));
        } else {
            setTaxPercent(Math.round((q / d) * 100));
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
        const curUser = auth.currentUser!;

        await deleteDoc(
            doc(database, "users", curUser.uid, "userVehicles", numberPlate)
        );

        navigation.goBack();
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
                <View className="bg-[#242731] w-[90%] h-32 rounded-lg p-4 flex-row items-center space-x-8">
                    <MotSvgComponent
                        color={
                            motPercent >= 75 && motPercent <= 100
                                ? "#ff754c"
                                : "#fff"
                        }
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
                </View>
                <View className="bg-[#242731] w-[90%] h-32 rounded-lg p-4 flex-row items-center space-x-8">
                    <Entypo
                        name="shield"
                        size={48}
                        color={
                            taxPercent >= 75 && taxPercent <= 100
                                ? "#ff754c"
                                : "#fff"
                        }
                    />
                    <View className="space-y-4">
                        <Text className="text-[#707175] text-base">
                            Tax Valid Until
                        </Text>
                        <Text className="text-2xl text-white">
                            {new Date(taxDate).toDateString()}
                        </Text>
                    </View>
                </View>
                <View className="bg-[#242731] w-[90%] h-32 rounded-lg p-4 flex-row items-center space-x-8">
                    <MaterialIcons
                        name="attach-money"
                        size={48}
                        color="white"
                    />
                    <View className="space-y-4">
                        <View className="flex-row items-center justify-between w-[90%]">
                            <Text className="text-[#707175] text-base mr-auto">
                                Insurance Valid Until
                            </Text>
                            {insuranceDate ? (
                                <TouchableOpacity className="flex-row bg-[#1e2128] p-2 items-center justify-center rounded-lg space-x-2">
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
                                new Date(motDate).toDateString()
                            ) : (
                                <TouchableOpacity className="flex-row bg-[#1e2128] px-4 py-2 items-center justify-center rounded-lg space-x-2">
                                    <Text className="text-white">Set Date</Text>
                                    <Feather
                                        name="edit-3"
                                        size={16}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            )}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VehicleInfoScreen;
