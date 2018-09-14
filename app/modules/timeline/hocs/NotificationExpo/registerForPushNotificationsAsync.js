import { Permissions, Notifications } from 'expo';
import { USER_ID, API_PUSH_NOTIFICATION } from '../../../../config/constants';
import { post } from '../../../globalApi';

export default async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }
    
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    post(API_PUSH_NOTIFICATION, {
        expoToken: token,
        id: USER_ID,
    });
    // return fetch(PUSH_ENDPOINT, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         expoToken: token,
    //         id: USER_ID,
    //     }),
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         console.log(response);
    //     }
    // })
    // .then(data => {
    //     console.log(data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
}