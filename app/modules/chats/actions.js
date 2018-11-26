import * as t from './actionTypes';
import * as api from './api';
import { AsyncStorage } from "react-native";

// import { signOut } from '../auth/actions';

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
        console.log(userId);
        api.getChatList(userId, function (success, data, error) {
            if (success) dispatch({ type: t.CHAT_LIST_AVAILABLE, data });
            else if (error) errorCB(error);
        });
    };
}

// export { signOut };