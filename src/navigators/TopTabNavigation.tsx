import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { functions } from "../../firebase";
import FullReport from "../screens/SearchScreen/FullReport";
import VehicleCheckScreen from "../screens/SearchScreen/VehicleCheckScreen";
import VehicleMotScreen from "../screens/SearchScreen/VehicleMotScreen";
import VehicleTaxScreen from "../screens/SearchScreen/VehicleTaxScreen";
import { RootStackParamList } from "../types/rootStackParamList";

const TopTabs = createMaterialTopTabNavigator<RootStackParamList>();

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "VehicleCheck"
>;

function MyTabs(props: any) {
    const navigation = useNavigation<NavigationProp>();

    const [motStatus, setMotStatus] = useState("");
    const [motExpiry, setMotExpiry] = useState("");

    const [taxStatus, setTaxStatus] = useState("");
    const [taxDueDate, setTaxDueDate] = useState("");
    const [co2, setCo2] = useState("");
    const [registered, setDateRegistered] = useState("");
    const [fuelType, setFuelType] = useState("");

    useEffect(() => {
        const getInfo = async () => {
            const getVehicleData = httpsCallable(functions, "getVehicleData");

            const res = await getVehicleData({
                numberPlate: props.numberPlate,
            });

            if (res.data === "ERR_BAD_REQUEST") {
                navigation.goBack();
                Alert.alert(`${props.numberPlate} is not a valid number plate`);
            }

            console.log(res);

            await setStates(res.data);
        };

        const setStates = async (res: any) => {
            setMotStatus(res.motStatus);
            setMotExpiry(res.motExpiryDate);

            setTaxStatus(res.taxStatus);
            setTaxDueDate(res.taxDueDate);
            setCo2(res.co2Emissions);
            setDateRegistered(res.monthOfFirstRegistration);
            setFuelType(res.fuelType);
        };

        getInfo();
    }, [props.numberPlate]);

    if (!fuelType) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    return (
        <TopTabs.Navigator
            initialRouteName="VehicleCheck"
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 12,
                    color: "#fff",
                },
                tabBarStyle: {
                    backgroundColor: "#1e2128",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 5.0,
                },
            }}
        >
            <TopTabs.Screen
                name="FullReport"
                component={FullReport}
                options={{ tabBarLabel: "Full Report" }}
                initialParams={{
                    numberPlate: props.numberPlate,
                }}
            />
            <TopTabs.Screen
                name="VehicleCheck"
                component={VehicleCheckScreen}
                options={{ tabBarLabel: "Technical" }}
                initialParams={{
                    numberPlate: props.numberPlate,
                }}
            />
            <TopTabs.Screen
                name="VehicleMot"
                component={VehicleMotScreen}
                options={{ tabBarLabel: "MOT" }}
                initialParams={{
                    numberPlate: props.numberPlate,
                    motStatus: motStatus,
                    motExpiry: motExpiry,
                }}
            />

            <TopTabs.Screen
                name="VehicleTax"
                component={VehicleTaxScreen}
                options={{ tabBarLabel: "Tax" }}
                initialParams={{
                    numberPlate: props.numberPlate,
                    taxStatus: taxStatus,
                    dueDate: taxDueDate,
                    co2Emissions: co2,
                    registered: registered,
                    fuelType: fuelType,
                }}
            />
        </TopTabs.Navigator>
    );
}

export default function TopBarNavigator({ route }: any) {
    return <MyTabs numberPlate={route.params.params.numberPlate} />;
}
