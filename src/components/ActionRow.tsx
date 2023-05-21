import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

type Props = {
    title: string;
    isValid: boolean;
    api: any;
    numberPlate: string;
};

const ActionRow = ({ title, isValid, api, numberPlate }: Props) => {
    const navigation = useNavigation<NavigationProp>();
    const buttonColor = isValid ? "#6c5dd2" : "#ff754c";

    return (
        <TouchableOpacity
            className={`flex-row bg-[#33343b] w-full rounded-xl p-2 mt-4 justify-center`}
            onPress={() =>
                title === "Tax"
                    ? navigation.navigate("VehicleTax", {
                          taxStatus: api.taxStatus,
                          dueDate: api.taxDueDate,
                          co2Emissions: api.co2Emissions,
                          registered: api.monthOfFirstRegistration,
                          fuelType: api.fuelType,
                      })
                    : navigation.navigate("VehicleMot", {
                          motStatus: api.motStatus,
                          motExpiry: api.motExpiryDate,
                          numberPlate: numberPlate,
                      })
            }
        >
            <View className="flex-1 justify-center items-center">
                <Ionicons
                    name={
                        isValid
                            ? "checkmark-circle-outline"
                            : "alert-circle-outline"
                    }
                    size={28}
                    color={buttonColor}
                    style={{ marginRight: "auto" }}
                />
            </View>
            <Text
                className={`${
                    isValid ? "text-[#6c5dd2]" : "text-[#ff754c]"
                } text-lg uppercase font-bold text-center`}
            >
                {title}
            </Text>
            <View className="flex-1"></View>
        </TouchableOpacity>
    );
};

export default ActionRow;
