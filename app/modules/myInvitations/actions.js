import * as t from './actionTypes';
import * as api from './api';
import { USER_ID } from './constants';

export function getInvitationsOut(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_INVITATION_OUT })
        api.getInvitationsOut({ userId: USER_ID }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_OUT_AVAILABLE, data });
            else if (error) errorCB(error)
        });
    };
}

export function getInvitationsOutRefresh(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_OUT });
        api.getInvitationsOut({ userId: USER_ID }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_OUT_REFRESHED, data });
            else if (error) errorCB(error)
        });
    };
}

export function getInvitationsIn(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_INVITATION_IN });
        api.getInvitationsIn({ userId: USER_ID }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_IN_AVAILABLE, data, userId: USER_ID });
            else if (error) errorCB(error);
        });
    };
}

export function getInvitationsInRefresh(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_IN });
        api.getInvitationsIn({ userId: USER_ID }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_IN_REFRESHED, data, userId: USER_ID });
            else if (error) errorCB(error);
        });
    };
}

export function getUserById(userId, errorCB) {
    return (dispatch) => {
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_USER, data });
            else if (error) errorCB(error);
        });
    };
}

export function confirmInvitation(invitationId, errorCB) {
    return (dispatch) => {
        // dispatch({ type: t.INVITATION_CONFIRMED, userId: USER_ID, invitationId });
        api.confirmInvitation({ invitationId, userId: USER_ID }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_CONFIRMED, data, userId: USER_ID, invitationId });
            else if (error) errorCB(error);
        });
    };
}

export function rejectInvitation(invitationId, errorCB) {
    return (dispatch) => {
        // dispatch({ type: t.INVITATION_REJECTED, userId: USER_ID, invitationId });
        api.rejectInvitation({ invitationId, userId: USER_ID }, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_REJECTED, data, userId: USER_ID, invitationId });
            else if (error) errorCB(error);
        });
    };
}