import React from 'react';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { View } from 'react-native';
import DefaultPopup from 'react-native-push-notification-popup';
import notificationRouter from './notificationRouter';

import { actions as invitationsActions } from "../../../myInvitations/index";
const { getInvitationsInRefresh } = invitationsActions;

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

const withNotificationExpoHOC = WrappedComponent =>
    connect(null, { getInvitationsInRefresh })(
        class extends React.Component {

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

                if (notification.origin === 'received') {
                    this.popup.show({
                        onPress: () => notificationRouter({ notification, ...this.props }),
                        appIconSource: require('../../../../assets/pimbay.png'),
                        appTitle: 'Pimbay',
                        timeText: 'Ahora',
                        // title: notification.data.title,
                        // body: notification.data.body,
                        title: 'Nueva invitación',
                        body: 'Tienes una nueva invitación de tu amigo nano 😀',
                    });
                } else {
                    notificationRouter({ notification, ...this.props });
                }
                
            };

            render() {
                return (
                    <View style={{flex: 1}}>
                        <DefaultPopup ref={ref => this.popup = ref} />
                        <WrappedComponent {...this.props} />
                    </View>
                );
            }
        }
    )

export default withNotificationExpoHOC;