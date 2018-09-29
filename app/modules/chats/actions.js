import * as t from './actionTypes';
import * as api from './api';

import { signOut } from '../auth/actions';

export function getUserById(userId, errorCB) {
    return (dispatch) => {
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_USER, data });
            else if (error) errorCB(error);
        });
    };
}

export { signOut };