import { View, Text } from "react-native";
import React from "react";

type Props = {
    title: string;
    data: string;
    lastRow?: boolean;
};

const TableFields = ({ title, data, lastRow }: Props) => {
    return (
        <View
            className={`rounded-t-lg h-12 items-center flex-row justify-between px-8 ${
                lastRow ? "" : "border-b-2"
            } border-[#33343b]`}
        >
            <Text className="text-white text-sm">{title}</Text>
            <Text className="text-white text-base font-bold">{data}</Text>
        </View>
    );
};

export default TableFields;
