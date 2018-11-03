import * as t from './actionTypes';
import * as api from './api';
import { AsyncStorage } from "react-native";

export function getLoggedUserData(errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_USER });
        const userId = await AsyncStorage.getItem('user_id');
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.USER_INFO_AVAILABLE, data });
            else if (error) errorCB(error);
        });
    };
}

export function updateUser(updateData, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.updateUser(userId, updateData, function (success, data, error) {
            if (success) dispatch({ data });
            else if (error) errorCB(error);
        });
    };
}