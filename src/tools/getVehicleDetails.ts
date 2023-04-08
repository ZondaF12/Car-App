import { DVLA_API } from "@env";
import axios from "axios";

export const getVehicleDetails = async (numberPlate: string) => {
    const data = JSON.stringify({ registrationNumber: numberPlate });
    const config = {
        method: "post",
        url: "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
        headers: {
            "x-api-key": `${DVLA_API}`,
            "Content-Type": "application/json",
        },
        data: data,
    };

    const res = await axios(config);
    return res.data;
};
