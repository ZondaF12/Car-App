import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfirmEmailScreen from "../screens/AuthScreen/ConfirmEmailScreen";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import RegisterScreen from "../screens/AuthScreen/RegisterScreen";
import { RootStackParamList } from "../types/rootStackParamList";
import BottomNavNavigator from "./BottomTabNavigation";

const StackNavigator = (user: any) => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Screen
                    name="Vehicles"
                    component={BottomNavNavigator}
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
        </Stack.Navigator>
    );
};

export default StackNavigator;
