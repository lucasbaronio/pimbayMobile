import * as t from './actionTypes';
import invitationsOutJson from './scenes/InvitationsOut/invitationsOut';

let initialState = {
    invitationsOut: []
};

const invitationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.INVITATION_OUT_AVAILABLE: {
            let invitationsOut = invitationsOutJson;
            return { ...state, invitationsOut };
        }

        default:
            return state;
    }
};

export default invitationsReducer;