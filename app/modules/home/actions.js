import * as t from './actionTypes';
import * as api from './api';

export function getInvitationsOut() {
    return (dispatch) => {
        dispatch({type: t.INVITATION_OUT_AVAILABLE})
    };
}