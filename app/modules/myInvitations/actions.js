import * as t from './actionTypes';
import * as api from './api';

export function getInvitationsOut() {
    return (dispatch) => {
        dispatch({type: t.INVITATION_OUT_AVAILABLE})
    };
}

export function getInvitationsIn(errorCB) {
    return (dispatch) => {
        // (start === 0)
        // ? dispatch({type: t.LOADING_INVITATION_IN})
        // : dispatch({type: t.LOADING_FOOTER_INVITATION_IN})
        dispatch({type: t.LOADING_INVITATION_IN})
        api.getInvitationsIn(function (success, data, error) {
            if (success) dispatch({type: t.INVITATION_IN_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}

export function getInvitationsInRefresh(errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_HEADER_INVITATION_IN});
        api.getInvitationsIn(function (success, data, error) {
            if (success) dispatch({type: t.INVITATION_IN_REFRESHED, data});
            else if (error) errorCB(error)
        });
    };
}