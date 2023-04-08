import { DVSA_MOT_API_KEY } from "@env";
import axios from "axios";

export const getMotDetails = async (numberPlate: string) => {
    console.log(numberPlate);
    const config = {
        method: "GET",
        url: `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests/?registration=${numberPlate}`,
        headers: {
            "x-api-key": `${DVSA_MOT_API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    const res = await axios(config);
    return res.data;
};
