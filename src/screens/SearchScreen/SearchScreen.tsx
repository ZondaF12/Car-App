import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, database } from "../../../firebase";
import SearchHistory from "../../components/SearchHistory";
import { useAuth } from "../../contexts/AuthContext";
import useRevenueCat from "../../hooks/useRevenueCat";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Search"
>;

export interface SearchHistoryType {
    createdAt: Date;
    make: string;
    numberPlate: string;
    yearOfManufacture: number;
}

const SearchScreen = ({ navigation }: any) => {
    const [searchHistory, setSearchHistory] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchPlate, setSearchPlate] = useState("");
    const { getUser } = useAuth();

    const { isProMember } = useRevenueCat();

    const { isLoaded, isClosed, load, show } = useInterstitialAd(
        TestIds.INTERSTITIAL
    );

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (isClosed) {
            navigation.navigate("VehicleCheck", {
                screen: "VehicleCheck",
                params: {
                    numberPlate: searchPlate.replace(/\s/g, ""),
                },
            });
        }
    }, [isClosed, navigation]);

    useEffect(() => {
        setSearchPlate("");
    }, [useIsFocused()]);

    useEffect(() => {
        const curUser = auth.currentUser!;

        setIsLoading(true);
        const q = query(
            collection(database, "users", curUser.uid, "searchHistory"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setSearchHistory([]);

            querySnapshot.forEach(async (doc) => {
                setSearchHistory((vehicleHistory: any) =>
                    vehicleHistory.concat(doc.data())
                );
            });
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const onClearSearchHistory = async () => {
        Alert.alert(
            "Clear your history",
            `Are you sure you want to clear your search history?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Clear",
                    style: "destructive",
                    onPress: () => clearSearchHistory(),
                },
            ]
        );
    };

    const clearSearchHistory = async () => {
        const curUser = await getUser();
        const batch = writeBatch(database);
        for (let vehicle in searchHistory) {
            batch.delete(
                doc(
                    database,
                    "users",
                    curUser.uid,
                    "searchHistory",
                    searchHistory[vehicle].numberPlate
                )
            );
        }

        await batch.commit();
    };

    const onSearch = async () => {};

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-[#1e2128] items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </SafeAreaView>
        );
    }

    return (
        <View
            className={`flex-1 bg-[#1e2128] items-center justify-start pt-8 h-full space-y-6`}
        >
            <View className="flex-row w-[90%] shadow-2xl h-[11%]">
                <View className="flex-col bg-[#6c5dd2] px-4 py-4 items-center justify-center rounded-l-md basis-[17%]">
                    <CountryFlag
                        isoCode="gb"
                        size={25}
                        style={{
                            height: 25,
                            width: 25,
                            borderRadius: 25,
                        }}
                    />
                    <Text className="text-white text-lg font-bold">GB</Text>
                </View>
                <View className="bg-white basis-[83%] justify-center space-y-2 pl-6 rounded-r-md">
                    <Text className="text-[#707175]">Enter Reg</Text>
                    <TextInput
                        placeholder="AA00 AAA"
                        style={{ fontSize: 18 }}
                        autoCapitalize={"characters"}
                        onSubmitEditing={(event) => {
                            if (isLoaded && !isProMember) {
                                show();
                            } else {
                                navigation.navigate("VehicleCheck", {
                                    screen: "VehicleCheck",
                                    params: {
                                        numberPlate:
                                            event.nativeEvent.text.replace(
                                                /\s/g,
                                                ""
                                            ),
                                    },
                                });
                            }
                        }}
                        autoCorrect={false}
                        value={searchPlate}
                        onChangeText={(numberPlate) => {
                            setSearchPlate(numberPlate);
                        }}
                    ></TextInput>
                </View>
            </View>
            <View className="w-[90%] max-h-[72%] shadow-xl rounded-lg bg-[#242731]">
                <View className="flex-row justify-between">
                    <View className="px-6 py-6">
                        <Text className="text-white text-xl">
                            Search History
                        </Text>
                    </View>
                    {searchHistory.length > 0 ? (
                        <TouchableOpacity onPress={onClearSearchHistory}>
                            <MaterialIcons
                                name="delete"
                                size={28}
                                color="white"
                                style={{ padding: 24 }}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {searchHistory.length > 0 ? (
                        searchHistory.map((vehicle: any) => (
                            <TouchableOpacity
                                onPress={(event) => {
                                    if (isLoaded && !isProMember) {
                                        setSearchPlate(vehicle.numberPlate);
                                        show();
                                    } else {
                                        navigation.navigate("VehicleCheck", {
                                            screen: "VehicleCheck",
                                            params: {
                                                numberPlate:
                                                    vehicle.numberPlate,
                                            },
                                        });
                                    }
                                }}
                            >
                                <SearchHistory
                                    numberPlate={vehicle.numberPlate}
                                    carModel={vehicle.make}
                                    regYear={vehicle.yearOfManufacture}
                                    date={vehicle.createdAt}
                                />
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text className="text-white p-8 text-base">
                            No Search History to Display
                        </Text>
                    )}
                </ScrollView>
            </View>
            {/* <View className=" w-[90%] h-1/4 shadow-xl rounded-lg bg-[#242731]">
                <View className="px-6 py-6">
                    <Text className="text-white text-xl">Purchase History</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <SearchHistory
                        numberPlate="F12 RCB"
                        carModel="2016 Ford Fiesta"
                        date="1 Day Ago"
                    />
                </ScrollView>
            </View> */}
        </View>
    );
};

export default SearchScreen;
