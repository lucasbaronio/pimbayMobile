import { AsyncStorage } from 'react-native';
import * as t from './actionTypes';

let initialState = { 
    isLoading: false,
    isLoggedIn: false, 
    user: null 
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING:
            return {...state, isLoading: !state.isLoading };

        case t.LOGGED_IN:
            const user = action.data;

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user_id', user.id], 
                ['user_username', user.userName], 
                ['user_fullName', user.fullName], 
                ['user_mail', user.mail], 
            ]);

            return { ...state, isLoggedIn: true, user: user, isLoading: false };

        case t.LOGGED_OUT:
            let keys = ['user_id', 'user_username', 'user_fullName', 'user_mail'];
            AsyncStorage.multiRemove(keys);

            return { ...state, isLoggedIn: false, user: null, isLoading: false };

        default:
            return state;
    }
};

export default authReducer;