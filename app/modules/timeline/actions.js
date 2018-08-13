
import * as t from './actionTypes';
import * as api from './api';

// errorCB -> errorCallback
export function getEventsOrInvitations(start, errorCB) {
    return (dispatch) => {
        (start === 0)
        ? dispatch({type: t.LOADING_HEADER_TIMELINE})
        : dispatch({type: t.LOADING_FOOTER_TIMELINE})
        api.getEventsOrInvitations(start, function (success, data, error) {
            if (success) dispatch({type: t.TIMELINE_AVAILABLE, data, start});
            else if (error) errorCB(error)
        });
    };
}

export function getContextActionList(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_CONTEXT_ACTION_LIST});
        api.getContextActionList(function (success, data, error) {
            if (success) dispatch({type: t.CONTEXT_ACTION_LIST_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

export function createInvitation(invitation, successCB, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_CREATE_INVITATION});
        api.createInvitation(invitation, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error);
        });
    };
}