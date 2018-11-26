import * as t from './actionTypes';

let initialState = {
    isLoadingChatList: false,
    chatList: [],
    userChatcamp: [],

    // invitationsIn: [],
    // users: [],
    // eventsFromInvitations: [],
    // contextActionsFromInvitations: [],
    // isLoadingOut: false,
    // isLoadingHeaderOut: false,
    // isLoadingMoreOut: false,
    // isLoadingIn: false,
    // isLoadingHeaderIn: false,
    // isLoadingMoreIn: false,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        case t.LOADING_CHAT_LIST: {
            return { ...state, isLoadingChatList: true }
        }

        case t.CHAT_LIST_AVAILABLE: {
            let { data } = action;
            console.log(data);
            let chatList = [].concat(data.group_channels);

            return { 
                ...state, 
                chatList,
                isLoadingChatList: false
            }
        }

        default:
            return state;
    }
};

export default chatReducer;