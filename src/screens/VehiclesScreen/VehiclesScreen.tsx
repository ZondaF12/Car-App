import "@azure/core-asynciterator-polyfill";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import { auth, database } from "../../../firebase";
import VehicleInfo from "../../components/VehicleInfo";
import { getMotDetails } from "../../tools/getMotDetails";
import { getVehicleDetails } from "../../tools/getVehicleDetails";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Vehicles"
>;

const schedulePushNotification = async (
    numberPlate: string,
    type: string,
    expiryDate: any
) => {
    if (!expiryDate || expiryDate === "SORN") {
        return;
    }

    const formattedExpiryDate = new Date(expiryDate);

    let date = new Date(expiryDate);
    date.setDate(date.getDate() - 30);
    date.setHours(8);

    const triggerDate: Date = new Date(date);

    const newNotification = await Notifications.scheduleNotificationAsync({
        content: {
            title: type === "TAX" ? "Vehicle Tax Expiring soon" : "MOT Due",
            body:
                type === "TAX"
                    ? `${numberPlate}'s TAX expires within 30 days (${formattedExpiryDate.toDateString()})`
                    : `${numberPlate} is due for an MOT within the next 30 days (${formattedExpiryDate.toDateString()})`,
        },
        trigger:
            triggerDate < new Date()
                ? new Date().setSeconds(new Date().getSeconds() + 2)
                : triggerDate,
    });

    return newNotification;
};

const VehiclesScreen = ({ navigation }: any) => {
    const [userVehicles, setUserVehicles] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const checkUserVehicles = async () => {
        const curUser = auth.currentUser!;

        setUserVehicles([]);

        const checkVehicles = await getDocs(
            query(
                collection(database, "users", curUser.uid, "userVehicles"),
                orderBy("createdAt")
            )
        );

        checkVehicles.forEach((QueryDocumentSnapshot) => {
            setUserVehicles((vehicle: any) =>
                vehicle.concat(QueryDocumentSnapshot.data())
            );
        });
    };

    useEffect(() => {
        const curUser = auth.currentUser!;

        const q = query(
            collection(database, "users", curUser.uid, "userVehicles"),
            orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setUserVehicles([]);

            querySnapshot.forEach(async (doc) => {
                setUserVehicles((vehicle: any) => vehicle.concat(doc.data()));
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const addNewVehicle = async (numberPlate: string) => {
        setIsLoading(true);
        setModalVisible(false);
        const curUser = auth.currentUser!;

        const vehicleRegPlate = numberPlate.replace(/\s/g, "");

        // Check if we already have that vehicle added
        const userVehicleDoc = doc(
            database,
            "users",
            curUser?.uid,
            "userVehicles",
            vehicleRegPlate
        );
        const userVehicleDuplicateQuery = await getDoc(userVehicleDoc);

        if (userVehicleDuplicateQuery.data()) {
            Alert.alert("Vehicle already Added");
            setIsLoading(false);
            return;
        }

        // Create new Vehicle if it doesnt already exist
        const vehicleDoc = doc(database, "vehicles", vehicleRegPlate);
        const q = await getDoc(vehicleDoc);

        let newVehicle;
        try {
            if (q.data()) {
                console.log("Vehicle Already Exists");
            } else {
                // Create New Vehicle
                const searchForVehicle = await getVehicleDetails(
                    vehicleRegPlate
                );
                const getExtraVehicleInfo = await getMotDetails(
                    vehicleRegPlate
                );

                newVehicle = {
                    taxDate: searchForVehicle.taxDueDate
                        ? searchForVehicle.taxDueDate
                        : "SORN",
                    motDate: searchForVehicle.motExpiryDate
                        ? new Date(searchForVehicle.motExpiryDate).toISOString()
                        : getExtraVehicleInfo[0].motTestExpiryDate
                        ? new Date(
                              getExtraVehicleInfo[0].motTestExpiryDate
                          ).toISOString()
                        : "",
                    make: searchForVehicle.make,
                    model: getExtraVehicleInfo[0].model,
                };

                await setDoc(doc(database, "vehicles", vehicleRegPlate), {
                    ...newVehicle,
                    numberPlate: vehicleRegPlate,
                });
            }
            // Add the vehicle to the user
            if (!userVehicleDuplicateQuery.data()) {
                let addVehicle;
                if (q.data()) {
                    addVehicle = q.data();
                } else {
                    addVehicle = newVehicle;
                }

                const setTaxNotification = await schedulePushNotification(
                    numberPlate,
                    "TAX",
                    addVehicle?.taxDate
                );

                const setMotNotification = await schedulePushNotification(
                    numberPlate,
                    "MOT",
                    addVehicle?.motDate
                );

                await setDoc(
                    doc(
                        database,
                        "users",
                        curUser?.uid,
                        "userVehicles",
                        vehicleRegPlate
                    ),
                    {
                        ...addVehicle,
                        createdAt: new Date().toISOString(),
                        numberPlate: vehicleRegPlate,
                        taxNotification: setTaxNotification
                            ? setTaxNotification
                            : "",
                        motNotification: setMotNotification
                            ? setMotNotification
                            : "",
                    }
                );
            }
            // refresh the screen to display the new vehicle
            await checkUserVehicles();
            setIsLoading(false);
        } catch (error: any) {
            Alert.alert(`${vehicleRegPlate} is an invalid plate`);
            console.error(error);
            setIsLoading(false);
        }
    };

    const onRefreshVehicleDetails = async () => {
        setRefreshing(true);

        for (let vehicle in userVehicles) {
            try {
                const res = await getVehicleDetails(
                    userVehicles[vehicle].numberPlate
                );

                let newMotDate = new Date(res.motExpiryDate);
                const newTaxDate = new Date(res.taxDueDate);

                if (!res.motExpiryDate) {
                    const motRes = await getMotDetails(
                        userVehicles[vehicle].numberPlate
                    );
                    newMotDate = new Date(motRes[0].motTestExpiryDate);
                }

                const currentTaxDate = new Date(userVehicles[vehicle].taxDate);
                const currentMotDate = new Date(userVehicles[vehicle].motDate);

                const updateDates =
                    newTaxDate.getTime() != currentTaxDate.getTime() ||
                    newMotDate.getTime() != currentMotDate.getTime();

                if (updateDates) {
                    const curUser = auth.currentUser!;
                    const userVehicleDoc = doc(
                        database,
                        "users",
                        curUser?.uid,
                        "userVehicles",
                        userVehicles[vehicle].numberPlate
                    );

                    const vehicleDoc = doc(
                        database,
                        "vehicles",
                        userVehicles[vehicle].numberPlate
                    );

                    await updateDoc(userVehicleDoc, {
                        motDate: newMotDate,
                        taxDate: newTaxDate,
                    });

                    await updateDoc(vehicleDoc, {
                        motDate: newMotDate,
                        taxDate: newTaxDate,
                    });
                }
            } catch (error) {
                setRefreshing(false);
            }
        }
        setRefreshing(false);
    };

    const vehcileInfoClicked = async (
        numberPlate: string,
        motDate: Date,
        taxDate: Date,
        insuranceDate: Date
    ) => {
        navigation.navigate("VehicleInfo", {
            numberPlate: numberPlate,
            motDate: motDate,
            taxDate: taxDate,
            insuranceDate: insuranceDate,
        });
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-[#1e2128] items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128] items-center mb-[55]">
            <View className="px-8 pt-8 pb-12 items-center w-full flex-row justify-between">
                <Text className="text-white text-[42px]">My Garage</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <AntDesign name="pluscircle" size={30} color="#6c5dd2" />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View className="flex-1 items-center justify-center">
                    <View className="h-60 w-3/4 bg-[#6c5dd2] rounded-lg">
                        <View className="flex-row items-center justify-between p-4 h-16">
                            <Text className="text-white text-xl">
                                Add Vehicle
                            </Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <AntDesign
                                    name="closecircle"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="items-center pt-8 h-44">
                            <View className="flex-row w-[80%] shadow-2xl h-16">
                                <View className="flex-col bg-[#6c5dd2] px-4 py-5 items-center justify-center rounded-l-md basis-[25%] shadow-xl">
                                    <CountryFlag
                                        isoCode="gb"
                                        size={25}
                                        style={{
                                            height: 25,
                                            width: 25,
                                            borderRadius: 25,
                                        }}
                                    />
                                    <Text className="text-white text-lg font-bold">
                                        GB
                                    </Text>
                                </View>
                                <View className="bg-white basis-[75%] justify-center space-y-2 pl-6 rounded-r-md">
                                    <Text className="text-[#707175]">
                                        Enter Reg
                                    </Text>
                                    <TextInput
                                        placeholder="AA00 AAA"
                                        style={{ fontSize: 18 }}
                                        autoCapitalize={"characters"}
                                        autoCorrect={false}
                                        onSubmitEditing={(event) =>
                                            addNewVehicle(
                                                event.nativeEvent.text
                                            )
                                        }
                                    ></TextInput>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView
                className="w-[90%] space-y-4"
                contentInsetAdjustmentBehavior="automatic"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefreshVehicleDetails}
                        tintColor="#fff"
                    />
                }
            >
                {userVehicles.length > 0 ? (
                    userVehicles.map((vehicle: any) => (
                        <VehicleInfo
                            numberPlate={vehicle.numberPlate}
                            make={vehicle.make}
                            model={vehicle.model}
                            motDate={vehicle.motDate}
                            taxDate={vehicle.taxDate}
                            insuranceDate={vehicle.insuranceDate}
                            onClick={() =>
                                vehcileInfoClicked(
                                    vehicle.numberPlate,
                                    vehicle.motDate,
                                    vehicle.taxDate,
                                    vehicle.insuranceDate
                                )
                            }
                        />
                    ))
                ) : (
                    <TouchableOpacity className="items-center justify-center">
                        <Text className="text-white text-lg">No Vehicles</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default VehiclesScreen;
