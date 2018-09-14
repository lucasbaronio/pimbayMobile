import * as t from './actionTypes';
import * as api from './api';

export function getInvitationsOut(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_INVITATION_OUT })
        api.getInvitationsOut(function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_OUT_AVAILABLE, data });
            else if (error) errorCB(error)
        });
    };
}

export function getInvitationsOutRefresh(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_OUT });
        api.getInvitationsOut(function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_OUT_REFRESHED, data });
            else if (error) errorCB(error)
        });
    };
}

export function getInvitationsIn(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_INVITATION_IN })
        api.getInvitationsIn(function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_IN_AVAILABLE, data });
            else if (error) errorCB(error)
        });
    };
}

export function getInvitationsInRefresh(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_HEADER_INVITATION_IN });
        api.getInvitationsIn(function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_IN_REFRESHED, data });
            else if (error) errorCB(error)
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