import { Entypo, Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebase";
import SettingsButton from "../../components/SettingsButton";

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Test Notification",
            body: "Here is the notification body",
            data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
    });
}

const AccountScreen = () => {
    const [user, setUser] = useState<any>("");
    const [userName, setUserName] = useState<any>("");

    const checkUser = async () => {
        try {
            const authUser = auth.currentUser!;
            // console.log(authUser);

            const getUserName = authUser.email!.split("@");

            setUser(authUser);
            setUserName(getUserName[0]);
        } catch (err) {
            setUser("");
        }
    };

    useEffect(() => {
        checkUser();
        console.log(auth.currentUser?.email);
    }, [auth.currentUser]);

    const signOut = async () => {
        auth.signOut();
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128]">
            <View className="px-8 pt-8 pb-12">
                <Text className="text-white text-[42px]">Account</Text>
            </View>
            <View>
                <Text className="text-white text-xl px-8 pb-6">Account</Text>
                <View className="flex-row px-8 items-center">
                    <View className="bg-[#6d5dd2] w-16 h-16 opacity-50 items-center justify-center rounded-full">
                        <Ionicons name="person" size={24} color="white" />
                    </View>
                    <View className="pl-8 justify-center">
                        <Text className="text-white text-lg">
                            {userName ? userName : "Unknown"}
                        </Text>
                        <Text className="text-[#707175]">Personal Info</Text>
                    </View>
                    <TouchableOpacity
                        className="bg-[#707175] w-12 h-12 opacity-50 items-center justify-center rounded-xl ml-auto"
                        onPress={schedulePushNotification}
                    >
                        <Entypo name="chevron-right" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="">
                <Text className="text-white text-xl px-8 mt-12 mb-6">
                    Settings
                </Text>
                <SettingsButton
                    label={"Language"}
                    icon={"earth"}
                    primaryColor="#ffb98f"
                    secondaryColor="#ffba8f80"
                />
                <SettingsButton
                    label={"Notifications"}
                    icon={"notifications"}
                    primaryColor="#99d9fc"
                    secondaryColor="#233f81"
                    switchButton
                />
                <SettingsButton
                    label={"Dark Mode"}
                    icon={"moon"}
                    primaryColor="#b4c6fc"
                    secondaryColor="#3a3d84"
                    switchButton
                />
                <SettingsButton
                    label={"Help"}
                    icon={"help-buoy"}
                    primaryColor="#ffa3bd"
                    secondaryColor="#533056"
                    lastItem
                />
            </View>
            <TouchableOpacity
                className="items-center bottom-0 pt-6"
                onPress={signOut}
            >
                <Text className="text-white text-lg">Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AccountScreen;
