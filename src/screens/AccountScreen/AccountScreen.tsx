import { Entypo } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Application from "expo-application";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { database } from "../../../firebase";
import SettingsButton from "../../components/SettingsButton";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Account"
>;

const nth = async (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

const AccountScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const appearanceBottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["35%"], []);

    const [userName, setUserName] = useState<any>("");
    const [joinedDate, setJoinedDate] = useState<any>("");
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);
    const [isUsingDeviceSettings, setIsUsingDeviceSettings] = useState(false);
    const [userAccountType, setUserAccountType] = useState("");
    const { userSignOut, getUser } = useAuth();

    const checkUser = async () => {
        const authUser = await getUser();

        const res = doc(database, "users", authUser.uid);
        const getUserName = await getDoc(res);
        const docData = getUserName.data();

        const creationDate = new Date(authUser.metadata.creationTime!);

        const joinedDay = creationDate.getDate();
        const joinedMonth = creationDate.toLocaleString("default", {
            month: "long",
        });
        const joinedYear = creationDate.getFullYear();

        setJoinedDate(
            `${joinedDay}${await nth(joinedDay)} ${joinedMonth} ${joinedYear}`
        );

        setUserName(docData?.name);
        setUserAccountType(docData?.accountType);
    };

    useEffect(() => {
        appearanceBottomSheetRef?.current?.close();
        checkUser();
    }, [useIsFocused()]);

    const signOut = async () => {
        await userSignOut();
    };

    const toggleDarkMode = async () => {
        setIsDarkModeEnabled((previousState) => !previousState);
    };

    const toggleUsingDeviceSettings = async () => {
        setIsUsingDeviceSettings((previousState) => !previousState);
    };

    return (
        <View className="flex-1 bg-[#1e2128]">
            <ScrollView className="mt-2">
                <TouchableOpacity
                    className="flex-row p-8 justify-between"
                    onPress={() => navigation.navigate("EditProfile")}
                >
                    <Text className="text-white text-base">Profile</Text>
                    <Entypo name="chevron-thin-right" size={18} color="white" />
                </TouchableOpacity>

                <View className="px-8 pb-8 border-b border-[#707175]">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-3xl text-white font-bold">
                            {userName}
                        </Text>
                        <Text className="text-[#6c5dd2] text-sm font-bold">
                            {userAccountType}
                        </Text>
                    </View>
                    <Text className="text-base text-[#707175] pt-3">
                        Member Since
                    </Text>
                    <Text className="text-lg text-white">{joinedDate}</Text>
                </View>
                <View className="px-8 pt-8 pb-2">
                    <Text className="text-[#707175] text-lg">APP SETTINGS</Text>
                </View>
                <SettingsButton label="Purchases" />
                <SettingsButton
                    label="Appearance"
                    onPress={() => appearanceBottomSheetRef?.current?.expand()}
                />
                <SettingsButton label="Security" />
                <View className="px-8 pt-8 pb-2">
                    <Text className="text-[#707175] text-lg">LEGAL</Text>
                </View>
                <SettingsButton label="Terms and Conditions" />
                <SettingsButton label="Privacy Policy" />
                <View className="mx-8 py-4">
                    <TouchableOpacity
                        className="flex-row justify-between"
                        onPress={signOut}
                    >
                        <Text className="text-white text-base">Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View className="mx-8 py-4 mb-24">
                    <Text className="text-[#707175] text-sm">
                        Version {Application.nativeApplicationVersion}
                    </Text>
                </View>
            </ScrollView>

            <BottomSheet
                ref={appearanceBottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: "#242731" }}
            >
                <View className="flex-1">
                    <View className="p-2 items-center">
                        <Text className="text-white text-lg font-bold">
                            Dark Mode
                        </Text>
                    </View>
                    <View className="px-4 py-4 space-y-6">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-white text-base">
                                Dark Mode
                            </Text>
                            <Switch
                                className="ml-auto"
                                trackColor={{
                                    false: "#33343b",
                                    true: "#6c5dd2",
                                }}
                                thumbColor="#fff"
                                ios_backgroundColor="#33343b"
                                onValueChange={toggleDarkMode}
                                value={isDarkModeEnabled}
                            />
                        </View>
                        <View>
                            <View className="flex-row items-center">
                                <Text className="text-white text-base">
                                    Use Device Settings
                                </Text>
                                <Switch
                                    className="ml-auto"
                                    trackColor={{
                                        false: "#33343b",
                                        true: "#6c5dd2",
                                    }}
                                    thumbColor="#fff"
                                    ios_backgroundColor="#33343b"
                                    onValueChange={toggleUsingDeviceSettings}
                                    value={isUsingDeviceSettings}
                                />
                            </View>
                            <Text className="pt-2 text-xs text-[#707175]">
                                Set Dark mode to use the Light or Dark selection
                                locatied in your Display & Brightness settings.
                            </Text>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
};

export default AccountScreen;
