import * as t from './actionTypes';
import * as api from './api';
import { AsyncStorage } from "react-native";

export function getUserById(userId, errorCB) {
    return (dispatch) => {
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_USER, data });
            else if (error) errorCB(error);
        });
    };
}

export function getChatList(successCB, errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_CHAT_LIST });
        const userId = await AsyncStorage.getItem('user_id');
        api.getChatList(userId, function (success, data, error) {
            if (success) {
                dispatch({ type: t.CHAT_LIST_AVAILABLE, data });
                successCB();
            } else if (error) errorCB(error);
        });
    };
}

export function getChatMessages(chatId, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_CHAT_MESSAGES });
        api.getChatMessages(chatId, function (success, data, error) {
            if (success) dispatch({ type: t.CHAT_MESSAGES_AVAILABLE, data });
            else if (error) errorCB(error);
        });
    };
}

export function markAsReadAllChatMessages(chatId, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.markAsReadAllChatMessages({ chatId, userId }, function (success, data, error) {
            if (error) errorCB(error);
        });
    };
}

export function sendMessage({ message, chat }, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.sendMessage({ chatId: chat.id, userId, message }, function (success, data, error) {
            if (success) {
                const { participants } = chat;
                for (var i = 0; i < participants.length; i++) {
                    const { id, metadata, display_name } = participants[i];
                    if (id !== userId && metadata) {
                        api.sendNotification({ 
                            chat, 
                            message: data.message, 
                            userToPushToken: metadata.expoToken 
                        }, function (successSendNotif, data, errorSendNotif) {
                            if (successSendNotif) console.log("Se envió push a ", display_name);
                            if (errorSendNotif) errorCB(error);
                        });
                    }
                }
            }
            if (error) errorCB(error);
        });
    };
}

export function changeChatName(name, chatId, errorCB) {
    return (dispatch) => {
        api.changeChatName({ chatId, name }, function (success, data, error) {
            if (success) console.log(data);
            if (error) errorCB(error);
        });
    };
}

export function getChatDetail(chatId, successCB, errorCB) {
    return (dispatch) => {
        api.getChatDetail({ chatId }, function (success, data, error) {
            if (success) successCB(data);
            if (error) errorCB(error);
        });
    };
}
