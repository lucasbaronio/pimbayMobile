import * as t from './actionTypes';

let initialState = {
    invitationsOut: [],
    invitationsIn: [],
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
            let { data, start } = action;
            let invitationsOut = [];
            if (start !== 0) {
                invitations = state.invitations;
            }
            invitationsOut = invitationsOut.concat(data);
            return {
                ...state, invitationsOut,
                isLoadingOut: false,
                isLoadingMoreOut: false,
            };
        }

        case t.INVITATION_OUT_REFRESHED: {
            let { data } = action;
            let invitationsOut = [];
            invitationsOut = invitationsOut.concat(data);
            return {
                ...state, invitationsOut,
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
            let { data, start } = action;
            let invitationsIn = [];
            if (start !== 0) {
                invitations = state.invitations;
            }
            invitationsIn = invitationsIn.concat(data);
            //invitationsIn = invitationsIn.concat(invitationsInJson);
            return {
                ...state, invitationsIn,
                isLoadingIn: false,
                isLoadingMoreIn: false,
            };
        }

        case t.INVITATION_IN_REFRESHED: {
            let { data } = action;
            let invitationsIn = [];
            invitationsIn = invitationsIn.concat(data);
            return {
                ...state, invitationsIn,
                isLoadingHeaderIn: false,
            };
        }

        default:
            return state;
    }
};

export default invitationsReducer;