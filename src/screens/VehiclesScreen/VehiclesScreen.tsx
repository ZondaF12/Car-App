import "@azure/core-asynciterator-polyfill";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { API, Auth, graphqlOperation } from "aws-amplify";
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
import Observable from "zen-observable-ts";
import { RootStackParamList } from "../../../App";
import {
    GetVehicleQuery,
    OnDeleteUserVehicleSubscription,
    UserVehiclesByUserIdQuery,
} from "../../API";
import VehicleInfo from "../../components/VehicleInfo";
import { createUserVehicle, createVehicle } from "../../graphql/mutations";
import { getVehicle, userVehiclesByUserId } from "../../graphql/queries";
import { onDeleteUserVehicle } from "../../graphql/subscriptions";
import { getVehicleDetails } from "../../tools/getVehicleDetails";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Vehicles"
>;

type SubscriptionValue = {
    value: {
        data: OnDeleteUserVehicleSubscription;
    };
};

const newCarMotDate = (registeredDate: Date) => {
    const regDate = new Date(registeredDate);
    const motDate = new Date(regDate.setFullYear(regDate.getFullYear() + 3));

    return motDate;
};

const VehiclesScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [userVehicles, setUserVehicles] = useState<any>();
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [plateAlreadySaved, setPlateAlreadySaved] = useState(false);

    const checkUserVehicles = async () => {
        const curUser = await Auth.currentAuthenticatedUser();
        const checkVehicles = (await API.graphql(
            graphqlOperation(userVehiclesByUserId, {
                userId: curUser.attributes?.sub,
            })
        )) as { data: UserVehiclesByUserIdQuery; errors: any[] };

        setUserVehicles(checkVehicles.data?.userVehiclesByUserId?.items);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        checkUserVehicles();

        let subscription: any;
        const initSubscription = async () => {
            const curUser = await Auth.currentAuthenticatedUser();
            subscription = API.graphql(
                graphqlOperation(onDeleteUserVehicle, {
                    filter: { userId: { eq: curUser.attributes?.sub } },
                })
            ) as Observable<any>;

            subscription.subscribe({
                next: ({ value }: SubscriptionValue) => {
                    console.log("UPDATED");
                    console.log(value);
                    setIsLoading(true);
                    checkUserVehicles();
                },
                error: (err: any) => console.warn(err),
            });
        };
        initSubscription();
        return () => subscription.unsubscribe();
    }, []);

    const addNewVehicle = async (numberPlate: string) => {
        setIsLoading(true);
        setModalVisible(false);
        // Check if we already have that vehicle added
        const curUser = await Auth.currentAuthenticatedUser();
        const checkVehicles = (await API.graphql(
            graphqlOperation(userVehiclesByUserId, {
                userId: curUser.attributes?.sub,
            })
        )) as { data: UserVehiclesByUserIdQuery; errors: any[] };

        // console.log(checkVehicles.data?.userVehiclesByUserId?.items);

        const duplicate = checkVehicles.data?.userVehiclesByUserId?.items.find(
            (item: any) => item.vehicleId === numberPlate
        );

        if (duplicate) {
            Alert.alert("Vehicle already Added");
            setIsLoading(false);
            return;
        }

        // for (let vehicleKey in checkVehicles.data?.userVehiclesByUserId
        //     ?.items) {
        //     if (
        //         checkVehicles.data?.userVehiclesByUserId?.items[vehicleKey]
        //             .vehicleId === numberPlate
        //     ) {
        //         Alert.alert("Vehicle already Added");
        //         setIsLoading(false);
        //         return;
        //     }
        // }

        // Create new Vehicle if it doesnt already exist
        const vehicleData = (await API.graphql(
            graphqlOperation(getVehicle, { id: numberPlate })
        )) as { data: GetVehicleQuery; errors: any[] };

        if (vehicleData.data?.getVehicle) {
            console.log("Vehicle Already Exists");
        } else {
            // Create New Vehicle
            try {
                const searchForVehicle = await getVehicleDetails(numberPlate);
                console.log(searchForVehicle);

                console.log(
                    newCarMotDate(searchForVehicle.monthOfFirstRegistration)
                );

                // console.log(
                //     new Date(searchForVehicle.taxDueDate).toISOString()
                // );

                const newVehicle = {
                    id: numberPlate,
                    numberPlate: numberPlate,
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
                console.log(newVehicle);

                const newVehicleData = await API.graphql(
                    graphqlOperation(createVehicle, { input: newVehicle })
                );
            } catch (error: any) {
                console.error(error);
                setIsLoading(false);
                Alert.alert(error.errors[0].message);
            }
        }
        // Add the vehicle to the user
        await API.graphql(
            graphqlOperation(createUserVehicle, {
                input: {
                    userId: curUser.attributes?.sub,
                    vehicleId: numberPlate,
                },
            })
        );

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
                {userVehicles ? (
                    userVehicles.map((vehicle: any) => (
                        <VehicleInfo
                            numberPlate={vehicle.vehicle.numberPlate}
                            make={vehicle.vehicle.make}
                            model={vehicle.vehicle.model}
                            motDate={vehicle.vehicle.motDate}
                            taxDate={vehicle.vehicle.taxDate}
                            onClick={() =>
                                vehcileInfoClicked(
                                    vehicle.vehicle.numberPlate,
                                    vehicle.vehicle.motDate,
                                    vehicle.vehicle.taxDate
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
