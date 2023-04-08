import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "./firebase";
import AccountScreen from "./src/screens/AccountScreen/AccountScreen";
import ConfirmEmailScreen from "./src/screens/AuthScreen/ConfirmEmailScreen";
import LoginScreen from "./src/screens/AuthScreen/LoginScreen";
import RegisterScreen from "./src/screens/AuthScreen/RegisterScreen";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import VehicleCheckScreen from "./src/screens/SearchScreen/VehicleCheckScreen";
import VehicleMotScreen from "./src/screens/SearchScreen/VehicleMotScreen";
import VehicleMotTestResultScreen from "./src/screens/SearchScreen/VehicleMotTestResultScreen";
import VehicleTaxScreen from "./src/screens/SearchScreen/VehicleTaxScreen";
import VehicleInfoScreen from "./src/screens/VehiclesScreen/VehicleInfoScreen";
import VehiclesScreen from "./src/screens/VehiclesScreen/VehiclesScreen";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ConfirmEmail: any;
    Vehicles: any;
    Search: undefined;
    Account: undefined;
    VehicleCheck: any;
    VehicleTax: any;
    VehicleMot: any;
    VehicleInfo: any;
    VehicleMotResults: any;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#6c5dd2",
                tabBarInactiveTintColor: "#fff",
                headerShown: false,
                tabBarStyle: {
                    height: 90,
                    paddingHorizontal: 5,
                    paddingTop: 0,
                    backgroundColor: "#1e2128",
                    position: "absolute",
                    borderTopWidth: 1,
                    borderTopColor: "#33343b",
                },
            }}
        >
            <Tab.Screen
                name="Vehicles"
                component={VehiclesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="car-sharp" size={size} color={color} />
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

const App = () => {
    const [user, setUser] = useState<undefined | null>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const checkUser = async (user: any) => {
        setUser(user);
        setIsLoading(false);
    };

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(checkUser);
        return subscriber;
    }, []);

    if (isLoading) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen
                        name="Vehicles"
                        component={Tabs}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ConfirmEmail"
                            component={ConfirmEmailScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                )}

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
                <Stack.Screen
                    name="VehicleInfo"
                    component={VehicleInfoScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
                <Stack.Screen
                    name="VehicleMotResults"
                    component={VehicleMotTestResultScreen}
                    options={{ headerShown: false, presentation: "modal" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
