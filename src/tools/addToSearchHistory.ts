import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../../firebase";

const addToSearchHistory = async (
    numberPlate: string,
    vehicleMake: string,
    yearOfReg: number
) => {
    const curUser = auth.currentUser!;

    /* Check if numberplate already exists in history - if it does then update
     * the entry of the createdAt to the current time */
    const userSearchHistoryDoc = doc(
        database,
        "users",
        curUser?.uid,
        "searchHistory",
        numberPlate
    );

    const userSearchHistoryDuplicateQuery = await getDoc(userSearchHistoryDoc);

    if (userSearchHistoryDuplicateQuery.data()) {
        /* Update search date in db entry */
        await updateDoc(userSearchHistoryDoc, {
            createdAt: new Date().toISOString(),
        });
    } else {
        /* Add the numberplate to the datatbase */

        await setDoc(
            doc(database, "users", curUser?.uid, "searchHistory", numberPlate),
            {
                createdAt: new Date().toISOString(),
                numberPlate: numberPlate,
                make: vehicleMake,
                yearOfManufacture: yearOfReg,
            }
        );
    }
};

export default addToSearchHistory;
