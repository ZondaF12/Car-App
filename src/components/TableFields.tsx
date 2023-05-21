import React from "react";
import { Text, View } from "react-native";

type Props = {
    title: string;
    data: string;
    lastRow?: boolean;
};

const TableFields = ({ title, data, lastRow }: Props) => {
    return (
        <View
            className={`mx-1 ${
                lastRow ? "" : " border-b border-[#707175]"
            } px-10 py-4 space-y-0.5`}
        >
            <Text className="text-[#707175] text-sm">{title}</Text>
            <Text className="text-white text-base font-bold">{data}</Text>
        </View>
    );
};

export default TableFields;
