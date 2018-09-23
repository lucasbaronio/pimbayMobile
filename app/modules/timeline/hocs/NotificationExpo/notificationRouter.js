import { Actions } from 'react-native-router-flux';
import * as t from './actionTypes';

export default function notificationRouter({ notification, getInvitationsInRefresh }) {
    // console.log(notification);
    if(notification.data.actionType) {
        switch (notification.data.actionType) {
            // switch (t.NEW_DIRECT_INVITATION) {
                case t.NEW_DIRECT_INVITATION: {
                    getInvitationsInRefresh((error) => alert(error.message));
                    Actions.push("InvitationsInOutStack");
                    break;
                }
        
                default:
                    return null;
            }
    }
    
}
