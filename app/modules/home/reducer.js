import * as t from './actionTypes';
import invitationsJson from './scenes/InvitationsIn/invitationsOut.json';

let initialState = {
    invitationsOut: []
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.INVITATION_OUT_AVAILABLE: {
            let invitationsOut = invitationsJson;
            return { ...state, invitationsOut };
        }

        default:
            return state;
    }
};

export default homeReducer;