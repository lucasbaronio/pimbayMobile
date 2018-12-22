import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    isLoadingHeader: false,
    isLoadingMore: false,
    invitations: [],
    invitationsFromFavouriteUsers: [],
    isLoadingEvents: false,
    isLoadingMoreEvents: false,
    events: [],
    isLoadingContextActionList: false,
    contextActions: [],
    isLoadingCreateInvitation: false,
    isLoadingFavoriteUsers: false,
    favoriteUsers: [],
    invitedUsers: [],
    users: [],
    eventsFromInvitations: [],
    contextActionsFromInvitations: [],
    isLoadingSearchedUsers: false,
    searchedUsers: [],
    isLoadingSearchedEvents: false,
    searchedEvents: [],
    emptySearchInput: true
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
            let { data, start, user } = action;
            let invitations = [],
                invitationsFromFavouriteUsers = [],
                users = [],
                eventsFromInvitations = [],
                contextActionsFromInvitations = [];
            if (start !== 0) {
                users = state.users;
                eventsFromInvitations = state.eventsFromInvitations;
                contextActionsFromInvitations = state.contextActionsFromInvitations;
                invitations = state.invitations;
                invitationsFromFavouriteUsers = state.invitationsFromFavouriteUsers;
            }
            let invitationsData = [], 
                invitationsFromFavouriteUsersData = [],
                contextActionsData = [],
                usersData = [],
                eventData = [];
            const { favoriteUsers } = user;
            for (var i = 0; i < data.length; i++) {
                const { invitation, context_action, user, event } = data[i];
                if(context_action) contextActionsData.push(context_action);
                if(event) eventData.push(event);
                usersData.push(user);
                invitationsData.push(invitation);
                if (favoriteUsers && favoriteUsers.indexOf(invitation.ownerId) > -1)
                    invitationsFromFavouriteUsersData.push(invitation);
            }
            eventsFromInvitations = eventsFromInvitations.concat(eventData);
            contextActionsFromInvitations = contextActionsFromInvitations
                                                .concat(contextActionsData);
            users = users.concat(usersData);
            invitations = invitations.concat(invitationsData);
            invitationsFromFavouriteUsers = invitationsFromFavouriteUsers
                                                .concat(invitationsFromFavouriteUsersData);
            return {
                ...state, invitations,
                invitationsFromFavouriteUsers,
                users, eventsFromInvitations,
                contextActionsFromInvitations,
                isLoading: false,
                isLoadingMore: false,
            };
        }

        case t.INVITATION_LIST_REFRESHED: {
            let { data, user } = action;
            let invitationsData = [],
                invitationsFromFavouriteUsersData = [],
                contextActionsData = [],
                usersData = [],
                eventData = [];
            const { favoriteUsers } = user;
            for (var i = 0; i < data.length; i++) {
                const { invitation, context_action, user, event } = data[i];
                if(context_action) contextActionsData.push(context_action);
                if(event) eventData.push(event);
                usersData.push(user);
                invitationsData.push(invitation);
                if (favoriteUsers && favoriteUsers.indexOf(invitation.ownerId) > -1)
                    invitationsFromFavouriteUsersData.push(invitation);
            }
            let eventsFromInvitations = [].concat(eventData);
            let contextActionsFromInvitations = [].concat(contextActionsData);
            let users = [].concat(usersData);
            let invitations = [].concat(invitationsData);
            let invitationsFromFavouriteUsers = [].concat(invitationsFromFavouriteUsersData);
            return {
                ...state, invitations,
                invitationsFromFavouriteUsers,
                users, eventsFromInvitations,
                contextActionsFromInvitations,
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
            let favoriteUsers = data;
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

            return {
                ...state,
                invitedUsers: state.invitedUsers.filter(user => user.id !== item.id)
            }
        }


        case t.ADD_USER: {
            let { data } = action;
            let users = state.users;
            let exist = false;
            for (var i = 0; i < users.length && !exist; i++) {
                if (users[i].id === data.id) {
                    users[i] = data;
                    exist = true;
                }
            }
            if (!exist) users.push(data);

            return { ...state, users }
        }

        case t.ADD_CONTEXT_ACTION: {
            let { data } = action;
            let { contextActionsFromInvitations } = state;
            let exist = false;
            for (var i = 0; i < contextActionsFromInvitations.length && !exist; i++) {
                if (contextActionsFromInvitations[i].id === data.id) {
                    contextActionsFromInvitations[i] = data;
                    exist = true;
                }
            }
            if (!exist) contextActionsFromInvitations.push(data);

            return { ...state, contextActionsFromInvitations }
        }

        case t.ADD_EVENT: {
            let { data } = action;
            let { eventsFromInvitations } = state;
            let exist = false;
            for (var i = 0; i < eventsFromInvitations.length && !exist; i++) {
                if (eventsFromInvitations[i].id === data.id) {
                    eventsFromInvitations[i] = data;
                    exist = true;
                }
            }
            if (!exist) eventsFromInvitations.push(data);

            return { ...state, eventsFromInvitations }
        }

        case t.SEARCHED_USERS: {
            let { data } = action;
            let searchedUsers = [];

            searchedUsers = searchedUsers.concat(data.matched_users);
            return {
                ...state, 
                searchedUsers,
                emptySearchInput: data.emptySearchInput,
                isLoadingSearchedUsers: false,
            };
        }

        case t.LOADING_SEARCHED_USERS: {
            return { ...state, isLoadingSearchedUsers: true }
        }

        case t.SEARCHED_EVENTS: {
            let { data } = action;
            let searchedEvents = [];

            searchedEvents = searchedEvents.concat(data.matched_events);
            return {
                ...state, 
                searchedEvents,
                emptySearchInput: data.emptySearchInput,
                isLoadingSearchedEvents: false,
            };
        }

        case t.LOADING_SEARCH_EVENTS: {
            return { ...state, isLoadingSearchedEvents: true }
        }

        case t.OPEN_INVITATION_CONFIRMED: {
            let { data } = action;

            let invitations = state.invitations.map((invitation, index) =>
                invitation.id === data.invitation.id 
                    ? data.invitation
                    : invitation
            );

            let invitationsFromFavouriteUsers = state.invitationsFromFavouriteUsers.map((invitation, index) =>
                invitation.id === data.invitation.id 
                    ? data.invitation
                    : invitation
            );
            
            return { 
                ...state, invitations,
                invitationsFromFavouriteUsers 
            }
        }

        case t.ADD_EVENT_CONTEXTACTION_USER_OI: {
            let { data } = action;
            const { context_action, user, event } = data;
            let eventsFromInvitations = state.eventsFromInvitations;
            let contextActionsFromInvitations = state.contextActionsFromInvitations;
            let users = state.users;
            if(context_action) contextActionsFromInvitations.push(context_action);
            if(event) eventsFromInvitations.push(event);
            users.push(user);

            return { ...state, eventsFromInvitations, contextActionsFromInvitations, users }
        }

        default:
            return state;
    }
};

export default timelineReducer;