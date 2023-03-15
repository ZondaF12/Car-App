import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VehiclesScreen from "./src/screens/VehiclesScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VehicleCheckScreen from "./src/screens/VehicleCheckScreen";
import VehicleTaxScreen from "./src/screens/VehicleTaxScreen";
import VehicleMotScreen from "./src/screens/VehicleMotScreen";

export type RootStackParamList = {
    Vehicles: undefined;
    Search: undefined;
    Account: undefined;
    VehicleCheck: any;
    VehicleTax: any;
    VehicleMot: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#64ffda",
                tabBarInactiveTintColor: "#fff",
                headerShown: false,
                tabBarStyle: {
                    height: 90,
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: "#091821",
                    position: "absolute",
                    borderTopWidth: 0,
                },
            }}
        >
            <Tab.Screen
                name="Vehicles"
                component={VehiclesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="car-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="wallet-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Vehicles"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Account"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VehicleCheck"
                    component={VehicleCheckScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VehicleTax"
                    component={VehicleTaxScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="VehicleMot"
                    component={VehicleMotScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
