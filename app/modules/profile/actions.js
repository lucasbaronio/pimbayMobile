import * as t from './actionTypes';
import * as api from './api';
import { AsyncStorage } from "react-native";

import { signOut } from '../auth/actions';

// export function getLoggedUserData(errorCB) {
//     return async (dispatch) => {
//         dispatch({ type: t.LOADING_USER });
//         const userId = await AsyncStorage.getItem('user_id');
//         api.getUserById(userId, function (success, data, error) {
//             if (success) dispatch({ type: t.USER_INFO_AVAILABLE, data });
//             else if (error) errorCB(error);
//         });
//     };
// }

export function getUserData(userId, successCB, errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_USER });
        var isLoggedUser = !userId;
        var loggedUserId = await AsyncStorage.getItem('user_id');
        if (isLoggedUser) userId = loggedUserId;
        else isLoggedUser = loggedUserId === userId;
        api.getUserById(userId, function (success, data, error) {
            if (success) {
                if (!isLoggedUser) {
                    api.getUserById(loggedUserId, function (successLoggedUser, dataLoggedUser, errorLoggedUser) {
                        if (successLoggedUser) {
                            dispatch({ type: t.USER_INFO_AVAILABLE, data: dataLoggedUser, isLoggedUser: true });
                            dispatch({ type: t.USER_INFO_AVAILABLE, data, isLoggedUser });
                            successCB(isLoggedUser);
                        } else if (errorLoggedUser) errorCB(errorLoggedUser);
                    });
                } else {
                    dispatch({ type: t.USER_INFO_AVAILABLE, data, isLoggedUser });
                    successCB(isLoggedUser);
                }
            } else if (error) errorCB(error);
        });
    };
}

export function updateUser(updateData, successCB, errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.UPDATING_USER });        
        const userId = await AsyncStorage.getItem('user_id');
        api.updateUser(userId, updateData, function (success, data, error) {
            if (success) {
                dispatch({ type: t.UPDATED_USER, data });
                successCB(data);
            }
            else if (error) errorCB(error);
        });
    };
}

export function addFavouriteUser(mailToAdd, errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_ADD_FAVOURITE_USER });
        const myMail = await AsyncStorage.getItem('user_mail');
        api.addFavouriteUser({ myMail, mailToAdd }, null, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_FAVOURITE_USER, data });
            else if (error) errorCB(error);
        });
    };
}

export { signOut };