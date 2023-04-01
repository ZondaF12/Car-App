import "@azure/core-asynciterator-polyfill";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    collection,
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
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
import { getVehicleDetails } from "../../tools/getVehicleDetails";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Vehicles"
>;

const newCarMotDate = (registeredDate: Date) => {
    const regDate = new Date(registeredDate);
    const motDate = new Date(
        regDate.setFullYear(regDate.getFullYear() + 3)
    ).toISOString();

    return motDate;
};

const VehiclesScreen = ({ navigation }: any) => {
    const [userVehicles, setUserVehicles] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [plateAlreadySaved, setPlateAlreadySaved] = useState(false);

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
        const q = query(
            collectionGroup(database, "userVehicles"),
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

        // Check if we already have that vehicle added
        const userVehicleDoc = doc(
            database,
            "users",
            curUser?.uid,
            "userVehicles",
            numberPlate
        );
        const userVehicleDuplicateQuery = await getDoc(userVehicleDoc);

        if (userVehicleDuplicateQuery.data()) {
            Alert.alert("Vehicle already Added");
            setIsLoading(false);
            return;
        }

        // Create new Vehicle if it doesnt already exist
        const vehicleDoc = doc(database, "vehicles", numberPlate);
        const q = await getDoc(vehicleDoc);

        let newVehicle;
        if (q.data()) {
            console.log("Vehicle Already Exists");
        } else {
            // Create New Vehicle
            try {
                const searchForVehicle = await getVehicleDetails(numberPlate);
                console.log(searchForVehicle);

                newVehicle = {
                    taxDate: searchForVehicle.taxDueDate
                        ? new Date(searchForVehicle.taxDueDate).toISOString()
                        : newCarMotDate(
                              searchForVehicle.monthOfFirstRegistration
                          ),
                    motDate: searchForVehicle.motExpiryDate
                        ? new Date(searchForVehicle.motExpiryDate).toISOString()
                        : newCarMotDate(
                              searchForVehicle.monthOfFirstRegistration
                          ),
                    make: searchForVehicle.make,
                };

                await setDoc(doc(database, "vehicles", numberPlate), {
                    ...newVehicle,
                    numberPlate: numberPlate,
                });
            } catch (error: any) {
                console.error(error);
                setIsLoading(false);
                Alert.alert(error.errors[0].message);
            }
        }
        // Add the vehicle to the user
        if (!userVehicleDuplicateQuery.data()) {
            let addVehicle;
            if (q.data()) {
                addVehicle = q.data();
            } else {
                addVehicle = newVehicle;
            }
            await setDoc(
                doc(
                    database,
                    "users",
                    curUser?.uid,
                    "userVehicles",
                    numberPlate
                ),
                {
                    ...addVehicle,
                    createdAt: new Date().toISOString(),
                    numberPlate: numberPlate,
                }
            );
        }

        // refresh the screen to display the new vehicle
        await checkUserVehicles();
        setIsLoading(false);
    };

    const vehcileInfoClicked = async (
        numberPlate: string,
        motDate: Date,
        taxDate: Date
    ) => {
        navigation.navigate("VehicleInfo", {
            numberPlate: numberPlate,
            motDate: motDate,
            taxDate: taxDate,
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
            >
                {userVehicles.length > 0 ? (
                    userVehicles.map((vehicle: any) => (
                        <VehicleInfo
                            numberPlate={vehicle.numberPlate}
                            make={vehicle.make}
                            model={vehicle.model}
                            motDate={vehicle.motDate}
                            taxDate={vehicle.taxDate}
                            onClick={() =>
                                vehcileInfoClicked(
                                    vehicle.numberPlate,
                                    vehicle.motDate,
                                    vehicle.taxDate
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
