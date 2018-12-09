import { Actions } from 'react-native-router-flux';
import * as t from './actionTypes';

export default function notificationRouter({ notification, getInvitationsInRefresh, getChatDetail }) {
    const { data } = notification;
    if(data.actionType) {
        switch (data.actionType) {
                case t.NEW_DIRECT_INVITATION: {
                    getInvitationsInRefresh((error) => alert(error.message), 
                        () => { Actions.push("InvitationsInOut") }
                    );
                    break;
                }
                case t.NEW_CHAT_MESSAGE: {
                    getChatDetail(data.id, ({ group_channel }) => {
                        Actions.push("ChatMessenger", { chat: group_channel });
                    }, this.onError);
                    break;
                }
        
                default:
                    return null;
            }
    }
    
}
