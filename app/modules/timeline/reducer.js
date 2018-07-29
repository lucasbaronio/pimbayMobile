import * as t from './actionTypes';
import invitations from './scenes/Timeline/invitations.json';

let initialState = {
    isLoading: false,
    isLoadingMore: false,
    eventsOrInvitations: []
};

const timelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_HEADER_TIMELINE: {
            const eventsOrInvitations = state.eventsOrInvitations;

            //show loading signal
            if (eventsOrInvitations.length === 0) 
                return { ...state, isLoading: true }

            return state;
        }

        case t.LOADING_FOOTER_TIMELINE: {
            // const eventsOrInvitations = state.eventsOrInvitations;

            // //show loading signal
            // if (eventsOrInvitations.length === 0) 
                return { ...state, isLoadingMore: true }

            // return state;
        }

        case t.TIMELINE_AVAILABLE: {
            let { data } = action;
            let timelineOld = state.eventsOrInvitations;
            let events = timelineOld.concat(data);
            let eventsOrInvitations = invitations.concat(events);
            return { ...state, eventsOrInvitations, isLoading: false, isLoadingMore: false };
        }

        // case t.LOGGED_OUT: {
        //     return {...state, eventsOrInvitations: []};
        // }

        default:
            return state;
    }
};

export default timelineReducer;