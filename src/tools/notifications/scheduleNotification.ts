import * as Notifications from "expo-notifications";

const schedulePushNotification = async (
    numberPlate: string,
    expiryDate: any,
    type?: string
) => {
    if (!expiryDate || expiryDate === "SORN") {
        return;
    }

    const formattedExpiryDate = new Date(expiryDate);

    let date = new Date(expiryDate);
    date.setDate(date.getDate() - 30);
    date.setHours(8);

    const triggerDate: Date = new Date(date);

    let body;
    if (triggerDate < new Date()) {
        const difference = formattedExpiryDate.getTime() - new Date().getTime();

        const dayDifference = Math.ceil(difference / (1000 * 3600 * 24));

        body =
            type === "TAX"
                ? `${numberPlate}'s TAX expires in ${dayDifference} days (${formattedExpiryDate.toDateString()})`
                : type === "MOT"
                ? `${numberPlate} is due for an MOT within the next ${dayDifference} days (${formattedExpiryDate.toDateString()})`
                : `Your insurance for ${numberPlate} expires in ${dayDifference} days (${formattedExpiryDate.toDateString()})`;
    } else {
        body =
            type === "TAX"
                ? `${numberPlate}'s TAX expires in 30 days (${formattedExpiryDate.toDateString()})`
                : type === "MOT"
                ? `${numberPlate} is due for an MOT within the next 30 days (${formattedExpiryDate.toDateString()})`
                : `Your insurance for ${numberPlate} expires in 30 days (${formattedExpiryDate.toDateString()})`;
    }

    const title =
        type === "TAX"
            ? "Vehicle Tax Expiring soon"
            : type === "MOT"
            ? "MOT Due"
            : "Insurance due for renewal";

    const newNotification = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: triggerDate < new Date() ? { seconds: 2 } : triggerDate,
    });

    return newNotification;
};

export default schedulePushNotification;
