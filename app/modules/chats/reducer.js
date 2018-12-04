import * as t from './actionTypes';

let initialState = {
    isLoadingChatList: false,
    chatList: [],
    chatMessages: [],
    isLoadingChatMessages: false,
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {

        case t.LOADING_CHAT_LIST: {
            return { ...state, isLoadingChatList: true }
        }

        case t.CHAT_LIST_AVAILABLE: {
            let { data } = action;
            let chatList = [].concat(data.group_channels);

            return { 
                ...state, 
                chatList,
                isLoadingChatList: false
            }
        }

        case t.LOADING_CHAT_MESSAGES: {
            return { ...state, isLoadingChatMessages: true }
        }

        case t.CHAT_MESSAGES_AVAILABLE: {
            let { data } = action;
            var chatMessages = arrayUnique(state.chatMessages.concat(data.messages));

            return { 
                ...state,
                chatMessages,
                isLoadingChatMessages: false
            }
        }

        default:
            return state;
    }
};

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].id === a[j].id)
                a.splice(j--, 1);
        }
    }
    return a;
}

export default chatReducer;