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
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import ActionRow from "../../components/ActionRow";
import FullCheckList from "../../components/FullCheckList";
import TableFields from "../../components/TableFields";
import addToSearchHistory from "../../tools/addToSearchHistory";
import { getVehicleDetails } from "../../tools/getVehicleDetails";
import { getVehicleImage } from "../../tools/getVehicleImage";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

const VehicleCheckScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["15%", "85%"], []);
    const [vehicleDetails, setVehicleDetails] = useState<any>();
    const [vehicleImage, setVehicleImage] = useState<any>();
    const vehicleRegPlate = route.params.numberPlate.replace(/\s/g, "");
    const [sheetIndex, setSheetIndex] = useState<number>();
    const [isBottomSheetLoaded, setIsBottomSheetLoaded] = useState(false);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
        setSheetIndex(index);
    }, []);

    useEffect(() => {
        const onGetVehicleDetails = async () => {
            try {
                const res = await getVehicleDetails(vehicleRegPlate);
                setVehicleDetails(res);
            } catch (e: any) {
                navigation.goBack();
                Alert.alert(
                    `${vehicleRegPlate} is not a valid number plate`,
                    e.message
                );
            }
        };

        const onGetVehicleImage = async () => {
            try {
                const res = await getVehicleImage(vehicleRegPlate);
                setVehicleImage(res);
            } catch (error: any) {
                navigation.goBack();
                Alert.alert(`error`, error.message);
            }
        };

        onGetVehicleDetails();
        // onGetVehicleImage();
    }, [vehicleRegPlate]);

    useEffect(() => {
        const checkSearchHistory = async () => {
            await addToSearchHistory(
                vehicleRegPlate,
                vehicleDetails.make,
                vehicleDetails.yearOfManufacture
            );
        };

        checkSearchHistory();
    }, [vehicleDetails]);

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
                <View className="flex-row items-center justify-center z-20">
                    <View className="flex-1 justify-start items-start h-12 top-3">
                        <TouchableOpacity
                            className="pl-8 flex-1 items-center justify-center"
                            onPress={() => navigation.goBack()}
                        >
                            <Text className="text-white text-center text-3xl">
                                &larr;
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-1 items-center justify-center">
                        <View className="bg-white w-52 items-center justify-center h-12 rounded-lg top-3 z-20 shadow-2xl">
                            <Text className="text-2xl font-bold uppercase">
                                {route.params.numberPlate}
                            </Text>
                        </View>
                    </View>
                    <View className="flex-1"></View>
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
                        numberPlate={vehicleRegPlate}
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
                        numberPlate={vehicleRegPlate}
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
                        </Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ alignItems: "center" }}
                    className="pt-6 px-4 relative"
                    onLayout={() => {
                        if (sheetIndex != undefined)
                            setIsBottomSheetLoaded(true);
                    }}
                >
                    <View className="border rounded-md w-full mb-32">
                        <View className="p-4 border-b">
                            <Text className="text-base font-bold">
                                Full HPI Vehicle Check
                            </Text>
                        </View>
                        <FullCheckList
                            icon="police-badge-outline"
                            header="Stolen"
                            description="Is the car recorded as stolen on the police national computer?"
                        />
                        <FullCheckList
                            icon="book-open-outline"
                            header="Finance"
                            description="Are there any outstanding loans and finance
                            agreements secured on the car?"
                        />
                        <FullCheckList
                            icon="draw-pen"
                            header="Written Off"
                            description="Has the car been in a serious accident and written off by an insurance company?"
                        />
                        <FullCheckList
                            icon="cash"
                            header="Valuation*"
                            description="4 market values including: trade-in, private sale, forecourt value and price at new. Additionally, we’ll tell you the car’s past and future values – you won’t find this information anywhere else. *Provided where available"
                        />
                        <FullCheckList
                            icon="account-supervisor-outline"
                            header="Previous Owners"
                            description="How many previous owners are registered on the logbook?"
                        />
                        <FullCheckList
                            icon="car-cog"
                            header="Plate Changes"
                            description="Are there any previous number plate changes on the car that might be hiding a murky past?"
                        />
                        <FullCheckList
                            icon="airplane"
                            header="Import/Export"
                            description="Has the car been imported or exported?"
                        />
                        <FullCheckList
                            icon="tools"
                            header="Scrapped"
                            description="Is the car registered as scrapped with the DVLA?"
                        />
                        <FullCheckList
                            icon="archive-check"
                            header="VIN/Chassis Check"
                            description="We check for any issues that might be recorded against the ‘Vehicle Identification Number’ that might not be recorded against the number plate."
                        />
                        <FullCheckList
                            icon="archive-search"
                            header="Logbook/VIN Match"
                            description="We check if the Logbook and VIN numbers match so you can avoid buying a stolen car."
                        />
                        <FullCheckList
                            icon="fuel"
                            header="Estimated Fuel Costs"
                            description="Forecast fuel costs for comparison purposes. Costs are based on 12,000 miles annually."
                        />
                        <FullCheckList
                            icon="more"
                            header="...And much more!"
                            description="Up to 80 data points in total!"
                        />
                    </View>
                </ScrollView>

                {isBottomSheetLoaded ? (
                    <TouchableOpacity className="absolute inset-x-0 bottom-8 left-4 right-4 h-16 bg-[#6c5dd2] rounded-full items-center justify-center">
                        <Text className="text-center text-lg font-bold text-white">
                            Purchase Full Report
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View className="flex-1 p-10 items-center justify-center">
                        <ActivityIndicator size="large" />
                    </View>
                )}
            </BottomSheet>
        </SafeAreaView>
    );
};

export default VehicleCheckScreen;
