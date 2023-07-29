import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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

    // useEffect(() => {
    //     const getUserDisplayName = async () => {
    //         setUserName(await getUserName());
    //     };

    //     if (!userName) {
    //         getUserDisplayName();
    //     }
    // }, []);

    return (
        <View className="w-full flex-row justify-between items-center px-4 ">
            <View className="items-center justify-center">
                <Text className="text-center text-white text-base">
                    {screen}
                </Text>
            </View>

            <TouchableOpacity className="h-8 w-8 items-center justify-center">
                <Text className="text-white text-sm">
                    {/* {userName ? getInitials(userName).toLocaleUpperCase() : ""} */}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header;
