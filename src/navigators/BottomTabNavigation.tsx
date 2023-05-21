import {
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import VehiclesScreen from "../screens/VehiclesScreen/VehiclesScreen";
import { RootStackParamList } from "../types/rootStackParamList";

const Tab = createBottomTabNavigator<RootStackParamList>();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Vehicles"
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
                    borderTopWidth: 2,
                    borderTopColor: "#33343b",
                },
            }}
        >
            <Tab.Screen
                name="Vehicles"
                component={VehiclesScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? "car-sharp" : "car-outline"}
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
                        <MaterialIcons
                            name="search"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name={
                                focused
                                    ? "account-circle"
                                    : "account-circle-outline"
                            }
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default function BottomNavNavigator() {
    return <Tabs />;
}
