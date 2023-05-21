import { useState } from "react";
import { CustomerInfo, PurchasesOffering } from "react-native-purchases";

const membershipTypes = {
    free: "FREE",
    pro: "PRO",
};

const useRevenueCat = () => {
    const [currentOffering, setCurrentOffering] =
        useState<PurchasesOffering | null>(null);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const isProMember = customerInfo?.activeSubscriptions.includes("pro");
};

export default useRevenueCat;
