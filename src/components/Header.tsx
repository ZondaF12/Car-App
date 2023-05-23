import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

type Props = {
    screen: string;
};

function getInitials(name: any) {
    return name
        .match(/(\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("");
}

const Header = ({ screen }: Props) => {
    const [userName, setUserName] = useState("");
    const { getUser } = useAuth();

    useEffect(() => {
        const getUserName = async () => {
            setUserName(await getUser().displayName);
        };

        if (!userName) {
            getUserName();
        }
    }, []);

    return (
        <View className="w-full flex-row justify-between items-center px-4 ">
            <TouchableOpacity className="h-8 w-8 rounded-full border-2 border-white items-center justify-center">
                <Text className="text-white text-sm">
                    {userName ? getInitials(userName).toLocaleUpperCase() : ""}
                </Text>
            </TouchableOpacity>

            <View className="items-center justify-center">
                <Text className="text-center text-white text-base">
                    {screen}
                </Text>
            </View>
        </View>
    );
};

export default Header;
