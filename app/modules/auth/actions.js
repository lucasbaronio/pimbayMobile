import * as t from './actionTypes';
import * as tProfile from '../profile/actionTypes';
import * as api from './api';
import { auth } from "../../config/firebase";

import { AsyncStorage } from "react-native";

export function register(user, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.register(user, function (successRegister, data, errorRegister) {
            dispatch({type: t.LOADING});
            if (successRegister) {
                api.createUserChatCamp(data, function (successCreateUser, dataCreateUser, errorCreateUser) {
                    if (successCreateUser) {
                        dispatch({type: t.LOGGED_IN, data});
                        dispatch({type: tProfile.USER_INFO_AVAILABLE, data, isLoggedUser: true });
                        successCB(data);
                    }
                    else if (errorCreateUser) errorCB(errorCreateUser)
                });
            }
            else if (errorRegister) errorCB(errorRegister)
        });
    };
}

export function finalizeCreateUser(user, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.updateUser(user, function (success, data, error) {
            dispatch({type: t.LOADING});
            if (success) {
                dispatch({type: t.LOGGED_IN, data: user});
                dispatch({type: tProfile.USER_INFO_AVAILABLE, data: user, isLoggedUser: true });
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING});
        api.login(data, function (success, data, error) {
            dispatch({type: t.LOADING});
            if (success) {
                if (data.exists) {
                    dispatch({type: t.LOGGED_IN, data: data.user});
                    dispatch({type: tProfile.USER_INFO_AVAILABLE, data: data.user, isLoggedUser: true });
                }
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: t.LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);
            
            if (isLoggedIn){
                api.getLoggedUser(user.email, function (success, data, error) {
                    if (success) {
                        const { exists, user } = data;
                        if (exists) {
                            dispatch({type: t.LOGGED_IN, data: user});
                            dispatch({type: tProfile.USER_INFO_AVAILABLE, data: user, isLoggedUser: true });
                        }
                        callback(exists, isLoggedIn);
                    }else if (error) {
                        //unable to get user
                        dispatch({type: t.LOGGED_OUT});
                        callback(false, false);
                    }
                });
            }else {
                dispatch({type: t.LOGGED_OUT});
                callback(false, isLoggedIn);
            }
        });
    };
}

export function signInWithFacebook(facebookToken, successCB, errorCB) {
    return (dispatch) => {
        api.signInWithFacebook(facebookToken, function (success, data, error) {
            if (success) {
                if (data.hasUserName) dispatch({type: t.LOGGED_IN, data: data.user});
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}

export function userLoggedInToCache(successCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        if (userId) {
            api.getUserById(userId, function (success, data, error) {
                if (success) dispatch({ type: t.COMPLETE_USER_INFO, data });
                else if (error) dispatch({ type: t.ONLY_USER_ID_INFO, data: userId });
                successCB();
            });
        } else successCB();
    };
}
