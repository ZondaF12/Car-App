import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../App";
import { auth, database } from "../../../firebase";
import SearchHistory from "../../components/SearchHistory";

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

    const checkSearchHistory = async () => {
        const curUser = auth.currentUser!;
        const searchHistoryQuery = await getDocs(
            query(
                collection(database, "users", curUser?.uid, "searchHistory"),
                orderBy("createdAt", "desc")
            )
        );

        searchHistoryQuery.forEach((QueryDocumentSnapshot) => {
            setSearchHistory((searchHistory: any) =>
                searchHistory.concat(QueryDocumentSnapshot.data())
            );
        });
    };

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
            "Deleting a Vehicle",
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
        const curUser = auth.currentUser!;
        for (let vehicle in searchHistory) {
            await deleteDoc(
                doc(
                    database,
                    "users",
                    curUser.uid,
                    "searchHistory",
                    searchHistory[vehicle].numberPlate
                )
            );
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-[#1e2128] items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
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
                        onSubmitEditing={(event) =>
                            navigation.navigate("VehicleCheck", {
                                numberPlate: event.nativeEvent.text,
                            })
                        }
                    ></TextInput>
                </View>
            </View>
            <View className="w-[90%] max-h-[75%] shadow-xl rounded-lg bg-[#242731]">
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
                            <SearchHistory
                                numberPlate={vehicle.numberPlate}
                                carModel={vehicle.make}
                                regYear={vehicle.yearOfManufacture}
                                date={vehicle.createdAt}
                            />
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
        </SafeAreaView>
    );
};

export default SearchScreen;
