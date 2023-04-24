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

    // Create new Vehicle if it doesnt already exist
    const vehicleDoc = doc(database, "vehicles", vehicleRegPlate);
    const q = await getDoc(vehicleDoc);

    let newVehicle;
    try {
        if (q.data()) {
            console.log("Vehicle Already Exists");
        } else {
            // Create New Vehicle
            const searchForVehicle = await getVehicleDetails(vehicleRegPlate);
            const getExtraVehicleInfo = await getMotDetails(vehicleRegPlate);

            newVehicle = {
                taxDate: searchForVehicle.taxDueDate
                    ? searchForVehicle.taxDueDate
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

            await setDoc(doc(database, "vehicles", vehicleRegPlate), {
                ...newVehicle,
                numberPlate: vehicleRegPlate,
            });
        }
        // Add the vehicle to the user
        if (!userVehicleDuplicateQuery.data()) {
            let addVehicle;
            if (q.data()) {
                addVehicle = q.data();
            } else {
                addVehicle = newVehicle;
            }

            const setTaxNotification = await schedulePushNotification(
                numberPlate,
                addVehicle?.taxDate,
                "TAX"
            );

            const setMotNotification = await schedulePushNotification(
                numberPlate,
                addVehicle?.motDate,
                "MOT"
            );

            await setDoc(
                doc(
                    database,
                    "users",
                    curUser?.uid,
                    "userVehicles",
                    vehicleRegPlate
                ),
                {
                    ...addVehicle,
                    createdAt: new Date().toISOString(),
                    numberPlate: vehicleRegPlate,
                    taxNotification: setTaxNotification
                        ? setTaxNotification
                        : "",
                    motNotification: setMotNotification
                        ? setMotNotification
                        : "",
                }
            );
        }
        // refresh the screen to display the new vehicle
    } catch (error: any) {
        Alert.alert(`${vehicleRegPlate} is an invalid plate`);
        console.error(error);
    }
};

export default addNewVehicle;
