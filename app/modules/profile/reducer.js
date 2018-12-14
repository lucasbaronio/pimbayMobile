import { AsyncStorage } from 'react-native';
import * as t from './actionTypes';

let initialState = {
    // user: null,
    userToShow: null,
    loggedUser: null,
    isLoadingUser: true,
    isLoadingAddFavouriteUser: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_USER: {
            return { ...state, isLoadingUser: true }
        }

        case t.USER_INFO_AVAILABLE: {
            let { data, isLoggedUser } = action;
            return { 
                ...state,
                userToShow: isLoggedUser ? state.userToShow : data, 
                loggedUser: isLoggedUser ? data : state.loggedUser,
                isLoadingUser: false 
            }
        }

        case t.UPDATING_USER: {
            return { ...state, isLoadingUser: true }
        }

        case t.UPDATED_USER: {
            let { data } = action;
            AsyncStorage.setItem('user_fullName', data.fullName);
            return { ...state, loggedUser: data, isLoadingUser: false }
        }

        case t.LOADING_ADD_FAVOURITE_USER: {
            return { ...state, isLoadingAddFavouriteUser: true }
        }

        case t.ADD_FAVOURITE_USER: {
            let { data } = action;
            return { ...state, loggedUser: data, isLoadingAddFavouriteUser: false }
        }

        default:
            return state;
    }
};

export default profileReducer;