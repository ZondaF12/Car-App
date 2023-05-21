import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import FullReport from "../screens/SearchScreen/FullReport";
import VehicleCheckScreen from "../screens/SearchScreen/VehicleCheckScreen";
import VehicleMotScreen from "../screens/SearchScreen/VehicleMotScreen";
import VehicleTaxScreen from "../screens/SearchScreen/VehicleTaxScreen";
import { getVehicleDetails } from "../tools/getVehicleDetails";
import { RootStackParamList } from "../types/rootStackParamList";

const TopTabs = createMaterialTopTabNavigator<RootStackParamList>();

function MyTabs(props: any) {
    const [motStatus, setMotStatus] = useState("");
    const [motExpiry, setMotExpiry] = useState("");

    const [taxStatus, setTaxStatus] = useState("");
    const [taxDueDate, setTaxDueDate] = useState("");
    const [co2, setCo2] = useState("");
    const [registered, setDateRegistered] = useState("");
    const [fuelType, setFuelType] = useState("");

    useEffect(() => {
        const getInfo = async () => {
            const res = await getVehicleDetails(props.numberPlate);
            console.log(res);

            await setStates(res);
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
                tabBarPressColor: "#6c5dd2",
            }}
        >
            <TopTabs.Screen
                name="FullReport"
                component={FullReport}
                options={{ tabBarLabel: "Full Report" }}
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
