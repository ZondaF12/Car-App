import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type Props = {
    header: string;
    description: string;
    icon: any;
};

const FullCheckList = ({ header, description, icon }: Props) => {
    return (
        <View className="flex-row p-4 break-words">
            <View className="items-center justify-center mr-4 w-8">
                <MaterialCommunityIcons name={icon} size={32} color="black" />
            </View>
            <View className="mr-12">
                <Text className="font-bold text-base">{header}</Text>
                <Text className="">{description}</Text>
            </View>
        </View>
    );
};

export default FullCheckList;
