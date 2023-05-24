import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "./firebase";
import { AuthProvider } from "./src/contexts/AuthContext";
import BottomNavNavigator from "./src/navigators/BottomTabNavigation";
import TopBarNavigator from "./src/navigators/TopTabNavigation";
import EditProfileScreen from "./src/screens/AccountScreen/EditProfileScreen";
import PurchasesScreen from "./src/screens/AccountScreen/PurchasesScreen";
import LoginScreen from "./src/screens/AuthScreen/LoginScreen";
import RegisterScreen from "./src/screens/AuthScreen/RegisterScreen";
import VehicleMotTestResultScreen from "./src/screens/SearchScreen/VehicleMotTestResultScreen";
import VehicleInfoScreen from "./src/screens/VehiclesScreen/VehicleInfoScreen";
import { RootStackParamList } from "./src/types/rootStackParamList";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    const [user, setUser] = useState<undefined | null>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [expoPushToken, setExpoPushToken] = useState<any>("");
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token: any) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {}
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    const checkUser = async (user: any) => {
        setUser(user);
        setIsLoading(false);
    };

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(checkUser);
        return subscriber;
    }, []);

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
        };

        getLocation();
    }, []);

    if (isLoading) {
        return (
            <View className="bg-[#1e2128] flex-1 p-10 items-center justify-center">
                <ActivityIndicator size="large" color="#6c5dd2" />
            </View>
        );
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    {user ? (
                        <Stack.Screen
                            name="Vehicles"
                            component={BottomNavNavigator}
                            options={{
                                headerShown: false,
                            }}
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
                        </>
                    )}

                    <Stack.Screen
                        name="Search"
                        component={BottomNavNavigator}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Account"
                        component={BottomNavNavigator}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="EditProfile"
                        component={EditProfileScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="VehicleCheck"
                        component={TopBarNavigator}
                        options={({ route }) => ({
                            headerStyle: {
                                backgroundColor: "#1e2128",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerBackTitleVisible: false,
                            headerTitle: route.params?.params?.numberPlate,
                        })}
                    />
                    <Stack.Screen
                        name="VehicleTax"
                        component={TopBarNavigator}
                        options={({ route }) => ({
                            headerStyle: {
                                backgroundColor: "#1e2128",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerBackTitleVisible: false,
                            headerTitle: route.params?.params?.numberPlate,
                        })}
                    />
                    <Stack.Screen
                        name="VehicleMot"
                        component={TopBarNavigator}
                        options={({ route }) => ({
                            headerStyle: {
                                backgroundColor: "#1e2128",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerBackTitleVisible: false,
                            headerTitle: route.params?.params?.numberPlate,
                        })}
                    />
                    <Stack.Screen
                        name="VehicleInfo"
                        component={VehicleInfoScreen}
                        options={({ route }) => ({
                            headerStyle: {
                                backgroundColor: "#1e2128",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerBackTitleVisible: false,
                            headerTitle: route.params?.numberPlate,
                        })}
                    />
                    <Stack.Screen
                        name="VehicleMotResults"
                        component={VehicleMotTestResultScreen}
                        options={{ headerShown: false, presentation: "modal" }}
                    />
                    <Stack.Screen
                        name="FullReport"
                        component={TopBarNavigator}
                        options={({ route }) => ({
                            headerStyle: {
                                backgroundColor: "#1e2128",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerBackTitleVisible: false,
                            headerTitle: route.params?.params?.numberPlate,
                        })}
                    />
                    <Stack.Screen
                        name="UserPurchases"
                        component={PurchasesScreen}
                        options={{
                            headerStyle: {
                                backgroundColor: "#1e2128",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                            },
                            headerBackTitleVisible: false,
                            headerTitle: "Purchases",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
