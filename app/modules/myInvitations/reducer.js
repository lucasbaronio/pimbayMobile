import * as t from './actionTypes';

let initialState = {
    invitationsOut: [],
    invitationsIn: [],
    users: [],
    eventsFromInvitations: [],
    contextActionsFromInvitations: [],
    isLoadingOut: false,
    isLoadingHeaderOut: false,
    isLoadingMoreOut: false,
    isLoadingIn: false,
    isLoadingHeaderIn: false,
    isLoadingMoreIn: false,
};

const invitationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_INVITATION_OUT: {
            const invitationsOut = state.invitationsOut;

            if (invitationsOut.length === 0)
                return { ...state, isLoadingOut: true }

            return state;
        }

        case t.LOADING_FOOTER_INVITATION_OUT: {
            return { ...state, isLoadingMoreOut: true }
        }

        case t.LOADING_HEADER_INVITATION_OUT: {
            return { ...state, isLoadingHeaderOut: true }
        }

        case t.INVITATION_OUT_AVAILABLE: {
            let { data, userId, start } = action;
            let invitationsOutData = [], 
                contextActionsData = [],
                usersData = [],
                eventData = [];
            for (var i = 0; i < data.length; i++) {
                const { invitation, context_action, user, event } = data[i];
                if(context_action) contextActionsData.push(context_action);
                if(event) eventData.push(event);
                usersData.push(user);
                invitationsOutData.push(invitation);
            }
            let eventsFromInvitations = state.eventsFromInvitations.concat(eventData);
            let contextActionsFromInvitations = state.contextActionsFromInvitations.concat(contextActionsData);
            let users = state.users.concat(usersData);

            // Todavia no hay paginado
            // let invitationsOut = (start !== 0) ? state.invitationsOut : [];
            let invitationsOut = [];
            
            invitationsOut = invitationsOut.concat(invitationsOutData);
            return {
                ...state, invitationsOut,
                users, eventsFromInvitations,
                contextActionsFromInvitations,
                isLoadingOut: false,
                isLoadingMoreOut: false,
            };
        }

        case t.INVITATION_OUT_REFRESHED: {
            let { data } = action;
            let invitationsOutData = [],
                contextActionsData = [],
                usersData = [],
                eventData = [];
            for (var i = 0; i < data.length; i++) {
                const { invitation, context_action, user, event } = data[i];
                if(context_action) contextActionsData.push(context_action);
                if(event) eventData.push(event);
                usersData.push(user);
                invitationsOutData.push(invitation);
            }
            let eventsFromInvitations = state.eventsFromInvitations.concat(eventData);
            let contextActionsFromInvitations = state.contextActionsFromInvitations.concat(contextActionsData);
            let users = state.users.concat(usersData);
            let invitationsOut = [].concat(invitationsOutData);
            return {
                ...state, invitationsOut,
                users, eventsFromInvitations,
                contextActionsFromInvitations,
                isLoadingHeaderOut: false,
            };
        }

        case t.LOADING_INVITATION_IN: {
            const invitationsIn = state.invitationsIn;

            if (invitationsIn.length === 0)
                return { ...state, isLoadingIn: true }

            return state;
        }

        case t.LOADING_FOOTER_INVITATION_IN: {
            return { ...state, isLoadingMoreIn: true }
        }

        case t.LOADING_HEADER_INVITATION_IN: {
            return { ...state, isLoadingHeaderIn: true }
        }

        case t.INVITATION_IN_AVAILABLE: {
            let { data, userId, start } = action;
            let invitationsInData = [], 
                contextActionsData = [],
                usersData = [],
                eventData = [];
            for (var i = 0; i < data.length; i++) {
                const { invitation, context_action, user, event } = data[i];
                if(context_action) contextActionsData.push(context_action);
                if(event) eventData.push(event);
                usersData.push(user);
                let iAmConfirmed = invitation.confirmedUsers.indexOf(userId) > -1;
                // let iAmConfirmed = invitation.confirmedUsersIds && (invitation.confirmedUsersIds.indexOf(userId) > -1);
                let iAmOut = invitation.rejectedUsers.indexOf(userId) > -1;
                // let iAmOut = invitation.rejectedUsersIds && invitation.rejectedUsersIds.indexOf(userId) > -1;
                invitationsInData.push({ ...invitation, iAmConfirmed, iAmOut });
            }
            let eventsFromInvitations = state.eventsFromInvitations.concat(eventData);
            let contextActionsFromInvitations = state.contextActionsFromInvitations.concat(contextActionsData);
            let users = state.users.concat(usersData);

            // Todavia no hay paginado
            // let invitationsIn = (start !== 0) ? state.invitationsIn : [];
            let invitationsIn = [];

            invitationsIn = invitationsIn.concat(invitationsInData);
            return {
                ...state, invitationsIn,
                users, eventsFromInvitations,
                contextActionsFromInvitations,
                isLoadingIn: false,
                isLoadingMoreIn: false,
            };
        }

        case t.INVITATION_IN_REFRESHED: {
            let { data, userId } = action;
            let invitationsInData = [],
                contextActionsData = [],
                usersData = [],
                eventData = [];
            for (var i = 0; i < data.length; i++) {
                const { invitation, context_action, user, event } = data[i];
                if(context_action) contextActionsData.push(context_action);
                if(event) eventData.push(event);
                usersData.push(user);
                let iAmConfirmed = invitation.confirmedUsers.indexOf(userId) > -1;
                // let iAmConfirmed = invitation.confirmedUsersIds && (invitation.confirmedUsersIds.indexOf(userId) > -1);
                let iAmOut = invitation.rejectedUsers.indexOf(userId) > -1;
                // let iAmOut = invitation.rejectedUsersIds && invitation.rejectedUsersIds.indexOf(userId) > -1;
                invitationsInData.push({ ...invitation, iAmConfirmed, iAmOut });
            }
            let eventsFromInvitations = state.eventsFromInvitations.concat(eventData);
            let contextActionsFromInvitations = state.contextActionsFromInvitations.concat(contextActionsData);
            let users = state.users.concat(usersData);
            let invitationsIn = [].concat(invitationsInData);
            return {
                ...state, invitationsIn,
                users, eventsFromInvitations,
                contextActionsFromInvitations,
                isLoadingHeaderIn: false,
            };
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

        case t.INVITATION_CONFIRMED: {
            let { data, userId, invitationId } = action;

            let invitationsIn = state.invitationsIn.map((invitation, index) =>
                invitation.id === invitationId 
                    ? { 
                        ...invitation, 
                        iAmConfirmed: true,
                        iAmOut: false,
                        // confirmedUsersIds: invitation.confirmedUsersIds
                        //         ? invitation.confirmedUsersIds.concat([userId])
                        //         : [].concat([userId]),
                        // rejectedUsersIds: invitation.rejectedUsersIds && (invitation.rejectedUsersIds.indexOf(userId) > -1)
                        //         ? invitation.rejectedUsersIds.slice(0, invitation.rejectedUsersIds.indexOf(userId))
                        //             .concat(invitation.rejectedUsersIds.slice(invitation.rejectedUsersIds.indexOf(userId) + 1))
                        //         : invitation.rejectedUsersIds,
                        confirmedUsers: invitation.confirmedUsers.concat([userId]),
                        rejectedUsers: (invitation.rejectedUsers.indexOf(userId) > -1)
                            ? invitation.rejectedUsers.slice(0, invitation.rejectedUsers.indexOf(userId))
                                .concat(invitation.rejectedUsers.slice(invitation.rejectedUsers.indexOf(userId) + 1))
                            : invitation.rejectedUsers,
                    }
                // invitation.id === data.invitation.id 
                //     ? {
                //         ...data.invitation,
                //         iAmConfirmed: true,
                //         iAmOut: false
                //     }
                    : invitation
            );
            
            return { ...state, invitationsIn }
        }

        case t.INVITATION_REJECTED: {
            let { data, userId, invitationId } = action;
            
            let invitationsIn = state.invitationsIn.map((invitation, index) =>
                invitation.id === invitationId 
                    ? { 
                        ...invitation, 
                        iAmConfirmed: false,
                        iAmOut: true,
                        // confirmedUsersIds: invitation.confirmedUsersIds && (invitation.confirmedUsersIds.indexOf(userId) > -1)
                        //     ? invitation.confirmedUsersIds.slice(0, invitation.confirmedUsersIds.indexOf(userId))
                        //         .concat(invitation.confirmedUsersIds.slice(invitation.confirmedUsersIds.indexOf(userId) + 1))
                        //     : invitation.confirmedUsersIds,
                        // rejectedUsersIds: invitation.rejectedUsersIds
                        //     ? invitation.rejectedUsersIds.concat([userId])
                        //     : [].concat([userId]),
                        confirmedUsers: (invitation.confirmedUsers.indexOf(userId) > -1)
                            ? invitation.confirmedUsers.slice(0, invitation.confirmedUsers.indexOf(userId))
                                .concat(invitation.confirmedUsers.slice(invitation.confirmedUsers.indexOf(userId) + 1))
                            : invitation.confirmedUsers,
                        rejectedUsers: invitation.rejectedUsers.concat([userId]),
                    }
                    : invitation
            );

            return { ...state, invitationsIn }
        }

        default:
            return state;
    }
};

export default invitationsReducer;