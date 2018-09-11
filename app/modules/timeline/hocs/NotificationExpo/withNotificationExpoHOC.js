import React from 'react';
import {
    Notifications,
} from 'expo';
import {
    Text,
    View,
} from 'react-native';

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

const withNotificationExpoHOC = WrappedComponent =>
    class extends React.Component {
        state = {
            notification: {},
        };

        componentDidMount() {
            registerForPushNotificationsAsync();
            
            // Handle notifications that are received or selected while the app
            // is open. If the app was closed and then opened by tapping the
            // notification (rather than just tapping the app icon to open it),
            // this function will fire on the next tick after the app starts
            // with the notification data.
            this._notificationSubscription = Notifications.addListener(this._handleNotification);
        }

        _handleNotification = (notification) => {
            this.setState({notification: notification});
        };

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }