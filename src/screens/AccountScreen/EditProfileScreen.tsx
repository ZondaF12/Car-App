import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { database } from "../../../firebase";
import SettingsButton from "../../components/SettingsButton";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "EditProfile"
>;

const EditProfileScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [currentName, setCurrentName] = useState("");
    const { getUser } = useAuth();

    useEffect(() => {
        const handleGetUser = async () => {
            const authUser = await getUser();

            const res = doc(database, "users", authUser.uid);
            const getUserData = await getDoc(res);
            const userData = getUserData.data();

            setUserName(userData?.name);
            setUserEmail(userData?.email);
            setCurrentName(userData?.name);
        };

        handleGetUser();
    }, []);

    const saveChanges = async () => {
        const authUser = await getUser();

        if (currentName != userName) {
            const res = doc(database, "users", authUser.uid);

            await updateDoc(res, {
                name: userName,
            });

            navigation.goBack();
        }
    };

    const onDeleteUserPressed = async () => {
        Alert.alert(
            "Deleting Account",
            `Are you sure you want to delete your account?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteCurrentUser(),
                },
            ]
        );
    };

    const deleteCurrentUser = async () => {};

    return (
        <SafeAreaView className="flex-1 bg-[#1e2128]">
            <View className="items-start px-8 mt-2 pb-4 border-b border-[#707175]">
                <TouchableOpacity
                    className="py-2"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-white text-center text-3xl">
                        &larr;
                    </Text>
                </TouchableOpacity>
                <View className="items-center justify-center ">
                    <Text className="text-white text-3xl font-bold">
                        Profile
                    </Text>
                </View>
            </View>
            <View className="mx-8 py-8 border-b border-[#707175]">
                <View className="">
                    <Text className="text-white text-lg font-bold">
                        Personal Details
                    </Text>
                    <View className="pt-4">
                        <Text className="text-sm text-[#707175]">Name</Text>
                        <TextInput
                            className="text-lg text-white"
                            placeholder="Name"
                            placeholderTextColor="#707175"
                            value={userName}
                            onChangeText={(value) => setUserName(value)}
                        ></TextInput>
                    </View>
                    <View className="pt-4">
                        <Text className="text-sm text-[#707175]">
                            Email Address
                        </Text>
                        <Text className="text-lg text-white">{userEmail}</Text>
                    </View>
                </View>
            </View>
            <SettingsButton label="Save" bold onPress={saveChanges} />
            <SettingsButton
                label="Delete Account"
                bold
                onPress={onDeleteUserPressed}
            />
        </SafeAreaView>
    );
};

export default EditProfileScreen;
