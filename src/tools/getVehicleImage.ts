import axios from "axios";

export const getVehicleImage = async (numberPlate: string) => {
    const res = await axios.get(
        `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleImageData?v=2&api_nullitems=1&auth_apikey=34abac14-405c-431e-899c-1a333a50f2a4&user_tag=&key_VRM=${numberPlate}
                `,
        { timeout: 5000 }
    );

    return res.data;
};
