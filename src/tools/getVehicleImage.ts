import axios from "axios";
import { useEffect, useState } from "react";

export const getVehicleImage = async (numberPlate: string) => {
    const [vehicleImage, setVehicleImage] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(
                    `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleImageData?v=2&api_nullitems=1&auth_apikey=34abac14-405c-431e-899c-1a333a50f2a4&user_tag=&key_VRM=${numberPlate}
                `,
                    { timeout: 5000 }
                )
                .then((res) => {
                    // console.log(
                    //     res.data.Response?.DataItems?.VehicleImages
                    //         ?.ImageDetailsList[0]?.ImageUrl
                    // );
                    setVehicleImage(
                        res.data.Response?.DataItems?.VehicleImages
                            ?.ImageDetailsList[0]?.ImageUrl
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchData().catch((err) => console.error(err));
    }, []);

    return vehicleImage;
};
