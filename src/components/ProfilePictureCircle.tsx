import React from "react";
import { Text, View } from "react-native";

type Props = {
    name: string;
};

function getInitials(name: any) {
    return name
        .match(/(\b\S)?/g)
        .join("")
        .match(/(^\S|\S$)?/g)
        .join("");
}

const ProfilePictureCircle = ({ name }: Props) => {
    return (
        <View className="h-20 w-20 rounded-full border-2 border-white items-center justify-center">
            <Text className="text-white text-2xl">
                {name ? getInitials(name).toLocaleUpperCase() : ""}
            </Text>
        </View>
    );
};

export default ProfilePictureCircle;
