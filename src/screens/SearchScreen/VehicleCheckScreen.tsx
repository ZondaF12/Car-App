import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import ActionRow from "../../components/ActionRow";
import TableFields from "../../components/TableFields";
import { getVehicleDetails } from "../../tools/getVehicleDetails";
import { getVehicleImage } from "../../tools/getVehicleImage";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

/* Add https://reactnative.dev/docs/refreshcontrol */

const VehicleCheckScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["15%", "85%"], []);
    const [vehicleDetails, setVehicleDetails] = useState<any>();
    const [vehicleImage, setVehicleImage] = useState<any>();
    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);

    useEffect(() => {
        const onGetVehicleDetails = async () => {
            const res = await getVehicleDetails(route.params.numberPlate);
            setVehicleDetails(res);
        };

        const onGetVehicleImage = async () => {
            const res = await getVehicleImage(route.params.numberPlate);
            setVehicleImage(res);
        };

        onGetVehicleDetails();
        onGetVehicleImage();
    }, [route.params.numberPlate]);

    // const vehicleImage: any = undefined; // getVehicleImage(route.params.numberPlate);

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

    console.log(vehicleDetails);

    const newCarMotDate = (registeredDate: Date) => {
        const currentDate = new Date();
        const regDate = new Date(registeredDate);
        const motDate = new Date(
            regDate.setFullYear(regDate.getFullYear() + 3)
        );

        return motDate > currentDate;
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128]">
            <View className="items-center h-[86%]">
                <View className="bg-white w-52 items-center justify-center h-12 rounded-lg top-3 z-20 shadow-2xl">
                    <Text className="text-2xl font-bold uppercase">
                        {route.params.numberPlate}
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={{ alignItems: "center" }}
                    showsVerticalScrollIndicator={false}
                >
                    {vehicleImage ? (
                        <Image
                            className="mt-10"
                            source={{ uri: vehicleImage }}
                            style={{
                                height: 130,
                                width: 350,
                                marginBottom: 20,
                            }}
                        />
                    ) : (
                        <Image
                            className="mt-10"
                            source={require("../../../assets/car.png")}
                            style={{
                                height: 130,
                                width: 350,
                                marginBottom: 20,
                            }}
                        />
                    )}

                    <ActionRow
                        title="Tax"
                        isValid={
                            vehicleDetails.taxStatus === "Taxed" ||
                            vehicleDetails.taxStatus === "SORN"
                                ? true
                                : false
                        }
                        api={vehicleDetails}
                    />
                    <ActionRow
                        title="Mot"
                        isValid={
                            vehicleDetails.motStatus === "Valid"
                                ? true
                                : vehicleDetails.motStatus ===
                                  "No details held by DVLA"
                                ? newCarMotDate(
                                      vehicleDetails?.monthOfFirstRegistration
                                  )
                                : false
                        }
                        api={vehicleDetails}
                    />

                    <View className="mt-5 rounded-lg w-full border-2 border-[#33343b]">
                        <View
                            className={`rounded-t-lg h-12 items-center flex-row justify-center px-8 border-b-2 border-[#33343b]`}
                        >
                            <Text className="text-white text-lg font-bold">
                                Basic Vehicle Details
                            </Text>
                        </View>
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
                            data={`${vehicleDetails.co2Emissions} g/km`}
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
                                    : "Unknown"
                            }
                            lastRow
                        />
                    </View>
                </ScrollView>
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View className="items-center space-y-2 -top-4">
                    <Text className="pt-6 text-2xl font-bold tracking-[1]">
                        Full Report
                    </Text>
                    <View className="bg-yellow-300 px-2 py-1 rounded-md">
                        <Text className="font-bold text-base">
                            WMWMF72060TL34222
                            {/* {vehicleDetails.vin} */}
                        </Text>
                    </View>
                </View>
                <View></View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default VehicleCheckScreen;
