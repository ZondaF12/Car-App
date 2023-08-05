import axios from "axios";
import { onCall } from "firebase-functions/v2/https";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getVehicleData = onCall(
    { region: "europe-west2", maxInstances: 10 },
    async (request) => {
        const data = JSON.stringify({
            registrationNumber: request.data.numberPlate,
        });
        const config = {
            method: "post",
            url: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
            headers: {
                "x-api-key": `${process.env.DVLA_API}`,
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            const res = await axios(config);
            return res.data;
        } catch (error: any) {
            return error.code;
        }
    }
);

exports.getMotDetails = onCall(
    { region: "europe-west2", maxInstances: 10 },
    async (request) => {
        const config = {
            method: "GET",
            url: `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests/?registration=${request.data.numberPlate}`,
            headers: {
                "x-api-key": `${process.env.DVSA_MOT_API_KEY}`,
                "Content-Type": "application/json",
            },
        };

        try {
            const res = await axios(config);
            return res.data;
        } catch (error: any) {
            return error.code;
        }
    }
);
