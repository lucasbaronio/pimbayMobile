import * as t from './actionTypes';
import * as api from './api';
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

export function getInvitationsInRefresh(errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_IN });
        const userId = await AsyncStorage.getItem('user_id');
        api.getInvitationsIn({ userId }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_IN_REFRESHED, data, userId });
            else if (error) errorCB(error);
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

export function confirmInvitation(invitationId, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.confirmInvitation({ invitationId, userId }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_CONFIRMED, data, userId, invitationId });
            else if (error) errorCB(error);
        });
    };
}

export function rejectInvitation(invitationId, errorCB) {
    return async (dispatch) => {
        const userId = await AsyncStorage.getItem('user_id');
        api.rejectInvitation({ invitationId, userId }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_REJECTED, data, userId, invitationId });
            else if (error) errorCB(error);
        });
    };
}