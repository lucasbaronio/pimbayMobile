import * as t from './actionTypes';
import invitationsOutJson from './scenes/InvitationsOut/invitationsOut';
import invitationsInJson from './scenes/InvitationsIn/invitationsIn';

let initialState = {
    invitationsOut: [],
    invitationsIn: [],
    isLoadingIn: false,
    isLoadingHeaderIn: false,
    isLoadingMoreIn: false,
};

const invitationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.INVITATION_OUT_AVAILABLE: {
            let invitationsOut = invitationsOutJson;
            return { ...state, invitationsOut };
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
            // let { data, start } = action;
            let invitationsIn = [];
            // if (start !== 0) {
            //     invitations = state.invitations;
            // }
            // invitationsIn = invitationsIn.concat(data);
            invitationsIn = invitationsIn.concat(invitationsInJson);
            return { 
                ...state, invitationsIn, 
                isLoadingIn: false, 
                isLoadingMoreIn: false,
            };
        }

        case t.INVITATION_IN_REFRESHED: {
            let { data } = action;
            let invitationsIn = [];
            // invitationsIn = invitationsIn.concat(data);
            invitationsIn = invitationsIn.concat(invitationsInJson);
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