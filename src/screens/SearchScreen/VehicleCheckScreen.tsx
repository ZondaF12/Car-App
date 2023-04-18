import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
import { auth, database } from "../../../firebase";
import ActionRow from "../../components/ActionRow";
import TableFields from "../../components/TableFields";
import { getVehicleDetails } from "../../tools/getVehicleDetails";
import { getVehicleImage } from "../../tools/getVehicleImage";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

/* Add https://reactnative.dev/docs/refreshcontrol */

const addToSearchHistory = async (
    numberPlate: string,
    vehicleMake: string,
    yearOfReg: number
) => {
    const curUser = auth.currentUser!;

    /* Check if numberplate already exists in history - if it does then update
     * the entry of the createdAt to the current time */
    const userSearchHistoryDoc = doc(
        database,
        "users",
        curUser?.uid,
        "searchHistory",
        numberPlate
    );

    const userSearchHistoryDuplicateQuery = await getDoc(userSearchHistoryDoc);

    if (userSearchHistoryDuplicateQuery.data()) {
        /* Update search date in db entry */
        await updateDoc(userSearchHistoryDoc, {
            createdAt: new Date().toISOString(),
        });
    } else {
        /* Add the numberplate to the datatbase */

        await setDoc(
            doc(database, "users", curUser?.uid, "searchHistory", numberPlate),
            {
                createdAt: new Date().toISOString(),
                numberPlate: numberPlate,
                make: vehicleMake,
                yearOfManufacture: yearOfReg,
            }
        );
    }
};

const VehicleCheckScreen = ({ route }: any) => {
    const navigation = useNavigation<NavigationProp>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["15%", "85%"], []);
    const [vehicleDetails, setVehicleDetails] = useState<any>();
    const [vehicleImage, setVehicleImage] = useState<any>();
    const vehicleRegPlate = route.params.numberPlate.replace(/\s/g, "");

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
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
                <View className="flex-row items-center justify-center">
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
