import * as t from './actionTypes';
import * as api from './api';

export function getEvent(eventId, errorCB) {
    return (dispatch) => {
        dispatch({type: t.LOADING_EVENT})
        api.getEventById(eventId, function (success, data, error) {
            if (success) dispatch({type: t.EVENT_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}