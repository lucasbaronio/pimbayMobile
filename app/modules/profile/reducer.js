import * as t from './actionTypes';

let initialState = {
    user: null,
    isLoadingUser: true
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_USER: {
            return { ...state, isLoadingUser: true }
        }

        case t.USER_INFO_AVAILABLE: {
            let { data } = action;
            return { user: data, isLoadingUser: false }
        }

        case t.UPDATED_USER: {
            let { data } = action;
            return { user: data, isLoadingUser: false }
        }

        default:
            return state;
    }
};

export default profileReducer;