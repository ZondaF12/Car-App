import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { database } from "../../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../types/rootStackParamList";

export type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "UserPurchases"
>;

const PurchasesScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    const [userPurchases, setUserPurchases] = useState<any>([]);

    const { getUser } = useAuth();

    useEffect(() => {
        const getPurchases = async () => {
            const authUser = await getUser();

            setUserPurchases([]);

            const checkPurchases = await getDocs(
                query(collection(database, "users", authUser.uid, "purchases"))
            );

            checkPurchases.forEach((QueryDocumentSnapshot) => {
                setUserPurchases((vehicle: any) =>
                    vehicle.concat(QueryDocumentSnapshot.data())
                );
            });

            console.log(userPurchases);
        };

        getPurchases();
    }, []);

    const onPurchasePress = async (numberPlate: string) => {
        navigation.navigate("FullReport", {
            screen: "FullReport",
            params: {
                numberPlate: numberPlate,
            },
        });
    };

    return (
        <View className="flex-1 bg-[#1e2128]">
            <View className="pt-8">
                <View className="mx-8 pb-8">
                    <Text className="text-white text-2xl font-bold">
                        Vehicle Reports
                    </Text>
                </View>
                {userPurchases.length > 0
                    ? userPurchases.map((purchase: any) => (
                          <View className="mx-8 py-4 border-b border-[#707175]">
                              <TouchableOpacity
                                  className="flex-row justify-between items-center"
                                  onPress={() =>
                                      onPurchasePress(purchase.numberPlate)
                                  }
                              >
                                  <Text
                                      className={`text-white text-lg font-bold`}
                                  >
                                      {purchase.numberPlate}
                                  </Text>
                                  <Entypo
                                      name="chevron-thin-right"
                                      size={18}
                                      color="white"
                                  />
                              </TouchableOpacity>
                          </View>
                      ))
                    : ""}
            </View>
        </View>
    );
};

export default PurchasesScreen;
