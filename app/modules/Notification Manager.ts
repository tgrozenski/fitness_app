import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export module NotificationManager {
    
    export class Notifs {

        async schedulePushNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: false,
                  shouldSetBadge: true,
                }),
              });

            Notifications.scheduleNotificationAsync({
                content: {
                title: "Rest Time Over",
                body: '',
                data: { data: 'goes here', test: { test1: 'more data' } },
                },
                trigger: { seconds: 1 },
            });
        }

        async registerForPushNotificationsAsync() {
        let token;
            console.log("Register Notifications is being called")
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                console.log("User should be prompted now!")
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            else {
                console.log("Permission is granted");
            }
            try {
                const projectId =
                    Constants?.expoConfig?.extra?.eas?.projectId ??
                    Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error('Project ID not found');
            }

            token = (
                await Notifications.getExpoPushTokenAsync({
                projectId,
                })
            ).data;
            console.log(token);
            } catch (e) {
            token = `${e}`;
            }

            } else {
                alert('Must use physical device for Push Notifications');
                }
        return token;
        }
            }
}