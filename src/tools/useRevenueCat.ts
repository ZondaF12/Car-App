import { REVENUECAT_APPLE } from "@env";
import { useEffect, useState } from "react";
import Purchases, {
    CustomerInfo,
    PurchasesOffering,
} from "react-native-purchases";

const membershipTypes = {
    monthly: "proMonthly_MPG",
    yearly: "proYearly_MPG",
};

const useRevenueCat = () => {
    const [currentOffering, setCurrentOffering] =
        useState<PurchasesOffering | null>(null);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const isProMember =
        customerInfo?.activeSubscriptions.includes(membershipTypes.monthly) ||
        customerInfo?.activeSubscriptions.includes(membershipTypes.yearly);

    useEffect(() => {
        const fetchData = async () => {
            await Purchases.configure({ apiKey: REVENUECAT_APPLE });

            const offerings = await Purchases.getOfferings();
            const customerInfo = await Purchases.getCustomerInfo();

            setCurrentOffering(offerings.current);
            setCustomerInfo(customerInfo);
        };

        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const CustomerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
            setCustomerInfo(purchaserInfo);
        };

        Purchases.addCustomerInfoUpdateListener(CustomerInfoUpdated);
    }, []);

    return { currentOffering, customerInfo, isProMember };
};

export default useRevenueCat;
