import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import TaxTableRow from "./TaxTableRow";

type Props = {
    emissions: number;
};

const TaxTable = ({ emissions }: Props) => {
    const [band, setBand] = useState("");

    useEffect(() => {
        const getTaxBand = (co2: number) => {
            if (co2 < 101) {
                setBand("A");
            } else if (co2 > 100 && co2 < 121) {
                setBand("BC");
            } else if (co2 > 120 && co2 < 141) {
                setBand("DE");
            } else if (co2 > 140 && co2 < 166) {
                setBand("FG");
            } else if (co2 > 165 && co2 < 186) {
                setBand("HI");
            } else if (co2 > 185 && co2 < 226) {
                setBand("JK");
            } else {
                setBand("LM");
            }
        };

        getTaxBand(emissions);
    }, []);

    return (
        <View className="w-[90%] py-5">
            <TaxTableRow emissions="0-100" band="A" isRating={band === "A"} />
            <TaxTableRow
                emissions="101-120"
                band="BC"
                isRating={band === "BC"}
            />
            <TaxTableRow
                emissions="121-140"
                band="DE"
                isRating={band === "DE"}
            />
            <TaxTableRow
                emissions="141-165"
                band="FG"
                isRating={band === "FG"}
            />
            <TaxTableRow
                emissions="166-185"
                band="HI"
                isRating={band === "HI"}
            />
            <TaxTableRow
                emissions="186-225"
                band="JK"
                isRating={band === "JK"}
            />
            <TaxTableRow emissions="225+" band="LM" isRating={band === "LM"} />
        </View>
    );
};

export default TaxTable;
