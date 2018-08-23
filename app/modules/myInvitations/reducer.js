import * as t from './actionTypes';
import invitationsOutJson from './scenes/InvitationsOut/invitationsOut';
import invitationsInJson from './scenes/InvitationsIn/invitationsIn';

let initialState = {
    invitationsOut: [],
    invitationsIn: [],
};

const invitationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.INVITATION_OUT_AVAILABLE: {
            let invitationsOut = invitationsOutJson;
            return { ...state, invitationsOut };
        }

        case t.INVITATION_IN_AVAILABLE: {
            let invitationsIn = invitationsInJson;
            return { ...state, invitationsIn };
        }

        default:
            return state;
    }
};

export default invitationsReducer;