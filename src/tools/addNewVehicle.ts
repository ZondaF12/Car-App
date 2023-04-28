import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { auth, database } from "../../firebase";
import { getMotDetails } from "./getMotDetails";
import { getVehicleDetails } from "./getVehicleDetails";
import schedulePushNotification from "./notifications/scheduleNotification";

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
        const searchForVehicle = await getVehicleDetails(vehicleRegPlate);
        const getExtraVehicleInfo = await getMotDetails(vehicleRegPlate);

        const newVehicle = {
            taxDate: searchForVehicle.taxDueDate
                ? new Date(searchForVehicle.taxDueDate).toISOString()
                : "SORN",
            motDate: searchForVehicle.motExpiryDate
                ? new Date(searchForVehicle.motExpiryDate).toISOString()
                : getExtraVehicleInfo[0].motTestExpiryDate
                ? new Date(
                      getExtraVehicleInfo[0].motTestExpiryDate
                  ).toISOString()
                : "",
            make: searchForVehicle.make,
            model: getExtraVehicleInfo[0].model,
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
