import * as t from './actionTypes';
// import invitations from './scenes/Timeline/invitations.json';

let initialState = {
    isLoading: false,
    isLoadingHeader: false,
    isLoadingMore: false,
    invitations: [],
    isLoadingEvents: false,
    isLoadingMoreEvents: false,
    events: [],
    isLoadingContextActionList: false,
    contextActions: [],
    isLoadingCreateInvitation: false,
    isLoadingFavoriteUsers: false,
    favoriteUsers: [],
    invitedUsers: []
};

const timelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_INVITATION_LIST: {
            const invitations = state.invitations;

            if (invitations.length === 0) 
                return { ...state, isLoading: true }

            return state;
        }

        case t.LOADING_FOOTER_INVITATION_LIST: {
            return { ...state, isLoadingMore: true }
        }

        case t.LOADING_HEADER: {
            return { ...state, isLoadingHeader: true }
        }

        case t.INVITATION_LIST_AVAILABLE: {
            let { data, start } = action;
            let invitations = [];
            if (start !== 0) {
                invitations = state.invitations;
            }
            invitations = invitations.concat(data);
            return { 
                ...state, invitations, 
                isLoading: false, 
                isLoadingMore: false,
            };
        }

        case t.INVITATION_LIST_REFRESHED: {
            let { data } = action;
            console.log(data);
            let invitations = [].concat(data);
            console.log(invitations);
            return { 
                ...state, invitations, 
                isLoadingHeader: false,
            };
        }

        case t.LOADING_EVENT_LIST: {
            const events = state.events;

            if (events.length === 0) 
                return { ...state, isLoadingEvents: true }

            return state;
        }

        case t.LOADING_FOOTER_EVENT_LIST: {
            return { ...state, isLoadingMoreEvents: true }
        }

        case t.EVENT_LIST_AVAILABLE: {
            let { data, start } = action;
            let events = [];
            if (start !== 0) {
                events = state.events;
            }
            events = events.concat(data);
            return { 
                ...state, events, 
                isLoadingEvents: false, 
                isLoadingMoreEvents: false,
            };
        }

        case t.LOADING_CONTEXT_ACTION_LIST: {
            return { ...state, isLoadingContextActionList: true }
        }

        case t.CONTEXT_ACTION_LIST_AVAILABLE: {
            let { data } = action;
            let contextActions = data
            return { 
                ...state, contextActions, 
                isLoadingContextActionList: false,
            }
        }

        case t.LOADING_CREATE_INVITATION: {
            return { ...state, isLoadingCreateInvitation: true }
        }

        case t.CREATE_INVITATION_SUCCESS: {
            return { 
                ...state, 
                isLoadingCreateInvitation: false,
                invitedUsers: []
            }
        }

        case t.CLEAN_CREATE_INVITATION: {
            return { 
                ...state, 
                isLoadingCreateInvitation: false,
                invitedUsers: []
            }
        }

        case t.LOADING_FAVORITE_USERS: {
            return { ...state, isLoadingFavoriteUsers: true }
        }

        case t.FAVORITE_USERS_AVAILABLE: {
            let { data } = action;
            let favoriteUsers = data
            return { 
                ...state, favoriteUsers, 
                isLoadingFavoriteUsers: false,
            }
        }

        case t.ADD_USER_TO_INVITED_LIST: {
            let { item } = action;
            let invitedUsers = state.invitedUsers.concat(item);
            
            return { ...state, invitedUsers }
        }

        case t.REMOVE_USER_FROM_INVITED_LIST: {
            let { item } = action;
            
            return { ...state, 
                invitedUsers: state.invitedUsers.filter(user => user.id !== item.id) }
        }

        default:
            return state;
    }
};

export default timelineReducer;