import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import { functions } from "../../../firebase";
import TableFields from "../../components/TableFields";
import addToSearchHistory from "../../tools/addToSearchHistory";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

const VehicleCheckScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const [vehicleDetails, setVehicleDetails] = useState<any>();
    const vehicleRegPlate = route.params.numberPlate.replace(/\s/g, "");

    useEffect(() => {
        const onGetVehicleDetails = async () => {
            const getVehicleData = httpsCallable(functions, "getVehicleData");

            const res: any = await getVehicleData({
                numberPlate: vehicleRegPlate,
            });

            setVehicleDetails(res.data);
        };

        onGetVehicleDetails();
    }, [vehicleRegPlate]);

    const checkSearchHistory = async () => {
        await addToSearchHistory(
            vehicleRegPlate,
            vehicleDetails.make,
            vehicleDetails.yearOfManufacture
        );
    };

    useEffect(() => {
        checkSearchHistory();
    }, [vehicleDetails]);

    if (vehicleDetails === "Request Failed") {
        navigation.goBack();
        Alert.alert(
            "Invalid Number Plate",
            "Sorry, this vehicle could not be found. Please check and try again",
            [{ text: "OK" }]
        );
    }

    if (!vehicleDetails) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#1e2128]">
            <View className="items-center">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="w-screen">
                        <TableFields title="Make" data={vehicleDetails.make} />
                        {/* <TableFields
                            title="Model"
                            data={vehicleDetails.model}
                        /> */}
                        <TableFields
                            title="Year"
                            data={vehicleDetails.yearOfManufacture}
                        />
                        <TableFields
                            title="Colour"
                            data={vehicleDetails.colour}
                        />
                        <TableFields
                            title="Engine Size"
                            data={`${vehicleDetails.engineCapacity} cc`}
                        />
                        <TableFields
                            title="CO2 Emissions"
                            data={
                                vehicleDetails?.co2Emissions
                                    ? `${vehicleDetails?.co2Emissions} g/km`
                                    : undefined
                            }
                        />
                        <TableFields
                            title="Fuel Type"
                            data={vehicleDetails.fuelType}
                        />
                        {/* <TableFields
                            title="Transmission"
                            data={vehicleDetails.transmission}
                        /> */}
                        <TableFields
                            title="First Registered"
                            data={vehicleDetails.monthOfFirstRegistration}
                        />
                        <TableFields
                            title="Type Approval"
                            data={vehicleDetails.typeApproval}
                        />
                        <TableFields
                            title="Wheel Plan"
                            data={vehicleDetails.wheelplan}
                        />
                        <TableFields
                            title="Euro Status"
                            data={
                                vehicleDetails.euroStatus
                                    ? vehicleDetails.euroStatus
                                    : undefined
                            }
                            lastRow
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default VehicleCheckScreen;
