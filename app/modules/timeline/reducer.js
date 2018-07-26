
import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    eventsOrInvitations: []
};

const timelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_TIMELINE: {
            const eventsOrInvitations = state.eventsOrInvitations;

            //show loading signal
            if (eventsOrInvitations.length === 0) 
                return {...state, isLoading: true}

            return state;
        }

        case t.TIMELINE_AVAILABLE: {
            let { data } = action;
            let eventsOrInvitations = data;

            return {...state, eventsOrInvitations, isLoading: false};
        }

        // case t.LOGGED_OUT: {
        //     return {...state, eventsOrInvitations: []};
        // }

        default:
            return state;
    }
};

export default timelineReducer;