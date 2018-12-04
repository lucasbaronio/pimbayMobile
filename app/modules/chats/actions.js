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

export function getChatList(errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_CHAT_LIST });
        const userId = await AsyncStorage.getItem('user_id');
        api.getChatList(userId, function (success, data, error) {
            if (success) dispatch({ type: t.CHAT_LIST_AVAILABLE, data });
            else if (error) errorCB(error);
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
