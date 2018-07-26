
import * as t from './actionTypes';
import * as api from './api';

// errorCB -> errorCallback
export function getEventsOrInvitations(start, size, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_TIMELINE});
        api.getEventsOrInvitations(start, size, function (success, data, error) {
            if (success) dispatch({type: t.TIMELINE_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}