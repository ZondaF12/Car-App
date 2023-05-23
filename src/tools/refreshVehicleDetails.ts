import * as Notifications from "expo-notifications";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../../firebase";
import { getMotDetails } from "./getMotDetails";
import { getVehicleDetails } from "./getVehicleDetails";
import schedulePushNotification from "./notifications/scheduleNotification";

const refreshVehicleDetails = async (userVehicles: any) => {
    for (let vehicle in userVehicles) {
        try {
            const res = await getVehicleDetails(
                userVehicles[vehicle].numberPlate
            );

            let newMotDate = new Date(res?.motExpiryDate);
            let newTaxDate: any = new Date(res?.taxDueDate);

            if (!res?.motExpiryDate) {
                const motRes = await getMotDetails(
                    userVehicles[vehicle].numberPlate
                );
                newMotDate = new Date(motRes[0].motTestExpiryDate);
            }

            const currentTaxDate = new Date(userVehicles[vehicle].taxDate);
            const currentMotDate = new Date(userVehicles[vehicle].motDate);

            /* If either dates do not match this will be true */
            const taxDateChanged =
                userVehicles[vehicle].taxDate === "SORN"
                    ? false
                    : newTaxDate.getTime() != currentTaxDate.getTime();

            const motDateChanged =
                newMotDate.getTime() != currentMotDate.getTime();

            if (userVehicles[vehicle].taxDate === "SORN" && !res?.taxDueDate) {
                newTaxDate = "SORN";
            }
            /* If true this will then update the values that have been stored */

            if (taxDateChanged || motDateChanged) {
                const curUser = auth.currentUser!;
                const userVehicleDoc = doc(
                    database,
                    "users",
                    curUser?.uid,
                    "userVehicles",
                    userVehicles[vehicle].numberPlate
                );

                const userVehicleQuery = await getDoc(userVehicleDoc);
                const userVehicleData = userVehicleQuery.data();

                /* If the mot date has changed we want to cancel any
                 * notifications if there are any and add a new one */
                let motNotification;
                if (motDateChanged) {
                    if (userVehicleData?.motNotification) {
                        await Notifications.cancelScheduledNotificationAsync(
                            userVehicleData?.motNotification
                        );
                    }

                    motNotification = await schedulePushNotification(
                        userVehicles[vehicle].numberPlate,
                        newMotDate,
                        "MOT"
                    );
                }

                /* If the tax date has changed we want to cancel any
                 * notifications if there are any and add a new one */
                let taxNotification;
                if (taxDateChanged) {
                    if (userVehicleData?.taxNotification) {
                        await Notifications.cancelScheduledNotificationAsync(
                            userVehicleData?.taxNotification
                        );
                    }

                    taxNotification = await schedulePushNotification(
                        userVehicles[vehicle].numberPlate,
                        newTaxDate,
                        "TAX"
                    );
                }

                /* Update the firebase docs with the new dates and
                 * notification id's if they have changed */

                await updateDoc(userVehicleDoc, {
                    motDate: newMotDate.toISOString(),
                    taxDate:
                        newTaxDate === "SORN"
                            ? "SORN"
                            : newTaxDate.toISOString(),
                    taxNotification: taxNotification
                        ? taxNotification
                        : userVehicleData?.taxNotification,
                    motNotification: motNotification
                        ? motNotification
                        : userVehicleData?.motNotification,
                });
            }
        } catch (error) {
            return error;
        }
    }
};

export default refreshVehicleDetails;
