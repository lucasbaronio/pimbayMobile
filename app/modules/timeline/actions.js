
import * as t from './actionTypes';
import * as api from './api';

// errorCB -> errorCallback
export function getEventsOrInvitations(start, errorCB) {
    return (dispatch) => {
        (start === 0)
        ? dispatch({type: t.LOADING_HEADER_TIMELINE})
        : dispatch({type: t.LOADING_FOOTER_TIMELINE})
        api.getEventsOrInvitations(start, function (success, data, error) {
            if (success) dispatch({type: t.TIMELINE_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}