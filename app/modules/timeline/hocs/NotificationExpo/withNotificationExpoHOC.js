import React from 'react';
import { connect } from 'react-redux';
import { Notifications } from 'expo';
import { View } from 'react-native';
import DefaultPopup from 'react-native-push-notification-popup';
import notificationRouter from './notificationRouter';

import { actions as invitationsActions } from "../../../myInvitations/index";
const { getInvitation, getConfirmedUsers, getRejectedUsers } = invitationsActions;
import { actions as chatActions } from "../../../chats/index";
const { getChatDetail } = chatActions;

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

const withNotificationExpoHOC = WrappedComponent =>
    connect(null, { getInvitation, getConfirmedUsers, getRejectedUsers, getChatDetail })(
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
                console.log(notification);
                if (notification.origin === 'received') {
                    this.popup.show({
                        onPress: () => notificationRouter({ notification, ...this.props }),
                        appIconSource: require('../../../../assets/pimbay.png'),
                        appTitle: 'Pimbay',
                        timeText: 'Ahora',
                        title: notification.data.title ? notification.data.title : 'Sin Título',
                        body: notification.data.body ? notification.data.body : 'Notificación sin un body 😀',
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