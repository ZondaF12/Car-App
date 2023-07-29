import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, database, functions } from "../../firebase";
import schedulePushNotification from "./notifications/scheduleNotification";
import { httpsCallable } from "firebase/functions";

const addNewVehicle = async (numberPlate: string) => {
    const curUser = auth.currentUser!;

    const vehicleRegPlate = numberPlate.replace(/\s/g, "");

    // Check if we already have that vehicle added
    const userVehicleDoc = doc(
        database,
        "users",
        curUser?.uid,
        "userVehicles",
        vehicleRegPlate
    );
    const userVehicleDuplicateQuery = await getDoc(userVehicleDoc);

    if (userVehicleDuplicateQuery.data()) {
        Alert.alert("Vehicle already Added");
        return;
    }

    try {
        /* Search API's for vehicle plate */
        const getVehicleData = httpsCallable(functions, "getVehicleData");

        const searchForVehicle: any = await getVehicleData({
            numberPlate: vehicleRegPlate,
        });

        const getMotDetails = httpsCallable(functions, "getMotDetails");

        const getExtraVehicleInfo: any = await getMotDetails({
            numberPlate: vehicleRegPlate,
        });

        const newVehicle = {
            taxDate: searchForVehicle.data?.taxDueDate
                ? new Date(searchForVehicle.data?.taxDueDate).toISOString()
                : "SORN",
            motDate: searchForVehicle.data?.motExpiryDate
                ? new Date(searchForVehicle.data?.motExpiryDate).toISOString()
                : getExtraVehicleInfo.data[0].motTestExpiryDate
                ? new Date(
                      getExtraVehicleInfo.data[0].motTestExpiryDate
                  ).toISOString()
                : "",
            make: searchForVehicle.data?.make,
            model: getExtraVehicleInfo.data[0].model,
        };

        /* Setup the notifications for the new vehicle that has been added */
        const setTaxNotification = await schedulePushNotification(
            numberPlate,
            newVehicle?.taxDate,
            "TAX"
        );

        const setMotNotification = await schedulePushNotification(
            numberPlate,
            newVehicle?.motDate,
            "MOT"
        );

        /* POST the new vehicle data to the users userVehicles collection */
        await setDoc(
            doc(
                database,
                "users",
                curUser?.uid,
                "userVehicles",
                vehicleRegPlate
            ),
            {
                ...newVehicle,
                createdAt: new Date().toISOString(),
                numberPlate: vehicleRegPlate,
                taxNotification: setTaxNotification ? setTaxNotification : "",
                motNotification: setMotNotification ? setMotNotification : "",
            }
        );
    } catch (error: any) {
        Alert.alert(`${vehicleRegPlate} is an invalid plate`);
        console.error(error);
    }
};

export default addNewVehicle;
