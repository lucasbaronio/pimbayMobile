import * as t from './actionTypes';
import * as tTimeline from '../timeline/actionTypes';
import * as api from './api';
import * as apiChat from '../chats/api';
import { AsyncStorage } from "react-native";

export function getInvitationsOut(errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_INVITATION_OUT });
        const userId = await AsyncStorage.getItem('user_id');
        api.getInvitationsOut({ userId }, function (success, invitsationsData, error) {
            if (success) {
                for (var i = 0; i < invitsationsData.length; i++) {
                    const { invitation } = invitsationsData[i];
                    api.getUserById(invitation.invitedUsers[0], function (userSuccess, userData, userError) {
                        if (userSuccess) {
                            dispatch({ type: t.ADD_USER, data: userData });
                            if (i === invitsationsData.length)
                                dispatch({ type: t.INVITATION_OUT_AVAILABLE, data: invitsationsData });
                        } else if (i === invitsationsData.length)
                            dispatch({ type: t.INVITATION_OUT_AVAILABLE, data: invitsationsData });
                    });
                }
                if (invitsationsData.length === 0) dispatch({ type: t.INVITATION_OUT_AVAILABLE, data: invitsationsData });
            } else if (error) errorCB(error)
        });
    };
}

export function getInvitationsOutRefresh(errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_OUT });
        const userId = await AsyncStorage.getItem('user_id');
        api.getInvitationsOut({ userId }, function (success, invitsationsData, error) {
            if (success) {
                for (var i = 0; i < invitsationsData.length; i++) {
                    const { invitation } = invitsationsData[i];
                    api.getUserById(invitation.invitedUsers[0], function (userSuccess, userData, userError) {
                        if (userSuccess) {
                            dispatch({ type: t.ADD_USER, data: userData });
                            if (i === invitsationsData.length)
                                dispatch({ type: t.INVITATION_OUT_REFRESHED, data: invitsationsData });
                        } else if (i === invitsationsData.length)
                            dispatch({ type: t.INVITATION_OUT_REFRESHED, data: invitsationsData });
                    });
                }
                if (invitsationsData.length === 0) dispatch({ type: t.INVITATION_OUT_AVAILABLE, data: invitsationsData });
            } else if (error) errorCB(error)
        });
    };
}

export function getInvitationsIn(errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_INVITATION_IN });
        const userId = await AsyncStorage.getItem('user_id');
        api.getInvitationsIn({ userId }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_IN_AVAILABLE, data, userId });
            else if (error) errorCB(error);
        });
    };
}

export function getInvitationsInRefresh(errorCB, successCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_IN });
        const userId = await AsyncStorage.getItem('user_id');
        api.getInvitationsIn({ userId }, function (success, data, error) {
            if (success) {
                dispatch({ type: t.INVITATION_IN_REFRESHED, data, userId });
                successCB && successCB();
            } else if (error) errorCB(error);
        });
    };
}

export function getUserById(userId, errorCB) {
    return async (dispatch) => {
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_USER, data });
            else if (error) errorCB(error);
        });
    };
}

export function confirmInvitation({ invitationId, chatId, isOpenInvitation }, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.confirmInvitation({ invitationId, userId }, function (success, data, error) {
            if (success) {
                apiChat.addUserToChat({ chatId, userId }, function (successAddUserToChat, dataAddUserToChat, errorAddUserToChat) {
                    if (successAddUserToChat) {
                        if (isOpenInvitation) dispatch({ type: tTimeline.OPEN_INVITATION_CONFIRMED, data });
                        else dispatch({ type: t.INVITATION_CONFIRMED, data, userId, invitationId });
                    } else if (errorAddUserToChat) errorCB(errorAddUserToChat);
                });
            } else if (error) errorCB(error);
        });
    };
}

export function rejectInvitation({ invitationId, chatId }, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.rejectInvitation({ invitationId, userId }, function (success, data, error) {
            if (success) {
                apiChat.removeUserFromChat({ chatId, userId }, function (successRemoveUserFromChat, dataRemoveUserFromChat, errorRemoveUserFromChat) {
                    if (successRemoveUserFromChat) dispatch({ type: t.INVITATION_REJECTED, data, userId, invitationId });
                    else if (errorRemoveUserFromChat) { 
                        dispatch({ type: t.INVITATION_REJECTED, data, userId, invitationId });
                    }
                });
            } else if (error) errorCB(error);
        });
    };
}

export function getConfirmedUsers({ confirmedUsers }, successCB, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.EMPTY_CONFIRMED_USER });
        var cont = 0;
        for (var i = 0; i < confirmedUsers.length; i++) {
            const userId = confirmedUsers[i];
            api.getUserById(userId, function (success, data, error) {
                if (success) {
                    dispatch({ type: t.NEW_CONFIRMED_USER, data });
                    cont = cont + 1;
                    if (cont === confirmedUsers.length) successCB();
                } else if (error) errorCB(error);
            });
        }
        if (cont === 0) successCB();
    };
}

export function getRejectedUsers({ rejectedUsers }, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.EMPTY_REJECTED_USER });
        for (var i = 0; i < rejectedUsers.length; i++) {
            const userId = rejectedUsers[i];
            api.getUserById(userId, function (success, data, error) {
                if (success) {
                    dispatch({ type: t.NEW_REJECTED_USER, data });
                } else if (error) errorCB(error);
            });
        }
    };
}