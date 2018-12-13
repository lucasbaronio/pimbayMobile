import * as t from './actionTypes';
import * as api from './api';
import * as apiChat from '../chats/api';
import { AsyncStorage } from "react-native";

// errorCB -> errorCallback
// export function getEventsOrInvitations(start, errorCB) {
//     return (dispatch) => {
//         (start === 0)
//         ? dispatch({type: t.LOADING_HEADER_TIMELINE})
//         : dispatch({type: t.LOADING_FOOTER_TIMELINE})
//         api.getEventsOrInvitations(start, function (success, data, error) {
//             if (success) dispatch({type: t.TIMELINE_AVAILABLE, data, start});
//             else if (error) errorCB(error)
//         });
//     };
// }

export function getInvitations(start, errorCB) {
    return (dispatch, getState) => {
        const { user } = getState().authReducer;
        (start === 0)
            ? dispatch({ type: t.LOADING_INVITATION_LIST })
            : dispatch({ type: t.LOADING_FOOTER_INVITATION_LIST })
        api.getInvitations(start, function (success, data, error) {
            if (success) {
                dispatch({ type: t.INVITATION_LIST_AVAILABLE, data, start, user });
            } else if (error) errorCB(error)
        });
    };
}

export function getInvitationsRefresh(errorCB) {
    return (dispatch, getState) => {
        const { user } = getState().authReducer;
        dispatch({ type: t.LOADING_HEADER });
        api.getInvitations(0, function (success, data, error) {
            if (success) dispatch({ type: t.INVITATION_LIST_REFRESHED, data, user });
            else if (error) errorCB(error)
        });
    };
}

export function getEvents(start, errorCB) {
    return (dispatch) => {
        (start === 0)
            ? dispatch({ type: t.LOADING_EVENT_LIST })
            : dispatch({ type: t.LOADING_FOOTER_EVENT_LIST })
        api.getEvents(start, function (success, data, error) {
            if (success) dispatch({ type: t.EVENT_LIST_AVAILABLE, data, start });
            else if (error) errorCB(error)
        });
    };
}

export function getContextActionList(errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_CONTEXT_ACTION_LIST });
        api.getContextActionList(function (success, data, error) {
            if (success) dispatch({ type: t.CONTEXT_ACTION_LIST_AVAILABLE, data });
            else if (error) errorCB(error)
        });
    };
}

export function createNewInvitation(invitation, avatar, successCB, errorCB) {
    return async (dispatch) => {
        dispatch({ type: t.LOADING_CREATE_INVITATION });
        const ownerId = await AsyncStorage.getItem('user_id');
        apiChat.createChat({ ownerId, avatar }, function (successCreateChat, dataCreateChat, errorCreateChat) {
            console.log(dataCreateChat);
            if (successCreateChat) {
                api.createInvitation({ 
                    ...invitation, 
                    ownerId, 
                    chatId: dataCreateChat.group_channel.id
                }, function (successCreateInvitation, data, errorCreateInvitation) {
                    if (successCreateInvitation) {
                        dispatch({ type: t.CREATE_INVITATION_SUCCESS });
                        successCB();
                    } else if (errorCreateInvitation) errorCB(errorCreateInvitation);
                });
            } else if (errorCreateChat) errorCB(errorCreateChat);
        });
    };
}

export function cleanCreateInvitation() {
    return (dispatch) => {
        dispatch({ type: t.CLEAN_CREATE_INVITATION });
    };
}

export function getFavoriteUsers(successCB, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_FAVORITE_USERS });
        api.getFavoriteUsers(function (success, data, error) {
            if (success) {
                dispatch({ type: t.FAVORITE_USERS_AVAILABLE, data });
                successCB(data);
            } else if (error) errorCB(error)
        });
    };
}

export function addUserToInvitedList(item) {
    return (dispatch) => {
        dispatch({ type: t.ADD_USER_TO_INVITED_LIST, item });
    };
}

export function removeUserFromInvitedList(item) {
    return (dispatch) => {
        dispatch({ type: t.REMOVE_USER_FROM_INVITED_LIST, item });
    };
}

export function getUserById(userId, errorCB) {
    return (dispatch) => {
        api.getUserById(userId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_USER, data });
            else if (error) errorCB(error);
        });
    };
}

export function searchUsersByUserNameOrFullName(value, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_SEARCHED_USERS });
        // if (value === "") dispatch({ type: t.SEARCHED_USERS, data: { matched_users: [], emptySearchInput: true } });
        // else 
        api.searchUsersByUserNameOrFullName(value, function (success, data, error) {
            if (success) dispatch({ type: t.SEARCHED_USERS, data: { ...data, emptySearchInput: value === "" } });
            else if (error) errorCB(error);
        });
    };
}

export function getContextActionById(contextActionId, errorCB) {
    return (dispatch) => {
        api.getContextActionById(contextActionId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_CONTEXT_ACTION, data });
            else if (error) errorCB(error);
        });
    };
}

export function getEventById(eventId, errorCB) {
    return (dispatch) => {
        api.getEventById(eventId, function (success, data, error) {
            if (success) dispatch({ type: t.ADD_EVENT, data });
            else if (error) errorCB(error);
        });
    };
}

export function searchEvents(value, errorCB) {
    return (dispatch) => {
        dispatch({ type: t.LOADING_SEARCH_EVENTS });
        api.searchEvents(value, function (success, data, error) {
            if (success) dispatch({ type: t.SEARCHED_EVENTS, data: { ...data, emptySearchInput: value === "" } });
            else if (error) errorCB(error);
        });
    };
}