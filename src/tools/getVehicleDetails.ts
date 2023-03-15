import axios from "axios";
import { useEffect, useState } from "react";

import { DVLA_API } from "@env";

export const getVehicleDetails = async (numberPlate: string) => {
    const [vehicleDetials, setVehicleDetails] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
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

            await axios(config)
                .then((res) => {
                    setVehicleDetails(res.data);
                })
                .catch((error) => {
                    console.error(error);
                    setVehicleDetails("Request Failed");
                });
        };

        fetchData().catch((err) => console.error(err));
    }, []);

    return vehicleDetials;
};
