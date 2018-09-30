import * as t from './actionTypes';
import * as api from './api';

export function getUserById(userId, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_USER });
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.USER_INFO_AVAILABLE, data });
            else if (error) errorCB(error);
        });
    };
}