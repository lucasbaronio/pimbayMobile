import * as t from './actionTypes';
import * as api from './api';

// errorCB -> errorCallback
// export function getEventsOrInvitations(start, errorCB) {
//     return (dispatch) => {
//         (start === 0)
//         ? dispatch({type: t.LOADING_HEADER_TIMELINE})
//         : dispatch({type: t.LOADING_FOOTER_TIMELINE})
//         api.getEventsOrInvitations(start, function (success, data, error) {
//             if (success) dispatch({type: t.TIMELINE_AVAILABLE, data, start});
//             else if (error) errorCB(error)
//         });
//     };
// }

export function getInvitations(start, errorCB) {
    return (dispatch) => {
        (start === 0)
            ? dispatch({ type: t.LOADING_INVITATION_LIST })
            : dispatch({ type: t.LOADING_FOOTER_INVITATION_LIST })
        api.getInvitations(start, function (success, data, error) {
            if (success) {
                dispatch({ type: t.INVITATION_LIST_AVAILABLE, data, start });
            } else if (error) errorCB(error)
        });
    };
}

export function getInvitationsRefresh(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_HEADER });
        api.getInvitations(0, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_LIST_REFRESHED, data });
            else if (error) errorCB(error)
        });
    };
}

export function getEvents(start, errorCB) {
    return (dispatch) => {
        (start === 0)
            ? dispatch({ type: t.LOADING_EVENT_LIST })
            : dispatch({ type: t.LOADING_FOOTER_EVENT_LIST })
        api.getEvents(start, function (success, data, error) {
            if (success) dispatch({ type: t.EVENT_LIST_AVAILABLE, data, start });
            else if (error) errorCB(error)
        });
    };
}

export function getContextActionList(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_CONTEXT_ACTION_LIST });
        api.getContextActionList(function (success, data, error) {
            if (success) dispatch({ type: t.CONTEXT_ACTION_LIST_AVAILABLE, data });
            else if (error) errorCB(error)
        });
    };
}

export function createNewInvitation(invitation, successCB, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_CREATE_INVITATION });
        api.createInvitation(invitation, function (success, data, error) {
            if (success) {
                dispatch({ type: t.CREATE_INVITATION_SUCCESS });
                successCB();
            } else if (error) errorCB(error);
        });
    };
}

export function cleanCreateInvitation() {
    return (dispatch) => {
        dispatch({ type: t.CLEAN_CREATE_INVITATION });
    };
}

export function getFavoriteUsers(successCB, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_FAVORITE_USERS });
        api.getFavoriteUsers(function (success, data, error) {
            if (success) {
                dispatch({ type: t.FAVORITE_USERS_AVAILABLE, data });
                successCB(data);
            } else if (error) errorCB(error)
        });
    };
}

export function addUserToInvitedList(item) {
    return (dispatch) => {
        dispatch({ type: t.ADD_USER_TO_INVITED_LIST, item });
    };
}

export function removeUserFromInvitedList(item) {
    return (dispatch) => {
        dispatch({ type: t.REMOVE_USER_FROM_INVITED_LIST, item });
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

export function getContextActionById(contextActionId, errorCB) {
    return (dispatch) => {
        api.getContextActionById(contextActionId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_CONTEXT_ACTION, data });
            else if (error) errorCB(error);
        });
    };
}

export function getEventById(eventId, errorCB) {
    return (dispatch) => {
        api.getEventById(eventId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_EVENT, data });
            else if (error) errorCB(error);
        });
    };
}