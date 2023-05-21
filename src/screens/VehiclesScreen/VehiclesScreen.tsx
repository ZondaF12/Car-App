import "@azure/core-asynciterator-polyfill";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
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
import { RootStackParamList } from "../../types/rootStackParamList";

import { auth, database } from "../../../firebase";
import VehicleInfo from "../../components/VehicleInfo";
import addNewVehicle from "../../tools/addNewVehicle";
import refreshVehicleDetails from "../../tools/refreshVehicleDetails";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Vehicles"
>;

const VehiclesScreen = ({ navigation }: any) => {
    const [userVehicles, setUserVehicles] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [userVehiclesLoaded, setUserVehiclesLoaded] = useState(false);

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
            setUserVehiclesLoaded(true);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        for (let vehicle in userVehicles) {
            const motDate = new Date(userVehicles[vehicle].motDate);
            // motDate.setDate(motDate.getDate() - 30);

            const taxDate = new Date(userVehicles[vehicle].taxDate);
            // taxDate.setDate(taxDate.getDate() - 30);

            console.log(motDate.getTime());
            console.log(new Date().getTime());

            if (
                motDate.getTime() < new Date().getTime() ||
                taxDate.getTime() < new Date().getTime()
            ) {
                refreshVehicleDetails(userVehicles);
                break;
            }
        }
    }, [userVehiclesLoaded]);

    const onAddNewVehicle = async (numberPlate: string) => {
        setIsLoading(true);
        setModalVisible(false);

        await addNewVehicle(numberPlate);

        await checkUserVehicles();
        setIsLoading(false);
    };

    const onRefreshVehicleDetails = async () => {
        setRefreshing(true);
        await refreshVehicleDetails(userVehicles);
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
                                        onSubmitEditing={(event) => {
                                            onAddNewVehicle(
                                                event.nativeEvent.text
                                            );
                                        }}
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
