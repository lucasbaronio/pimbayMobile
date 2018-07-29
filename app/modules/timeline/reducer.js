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

            if (eventsOrInvitations.length === 0) 
                return { ...state, isLoading: true }

            return state;
        }

        case t.LOADING_FOOTER_TIMELINE: {
            return { ...state, isLoadingMore: true }
        }

        case t.TIMELINE_AVAILABLE: {
            console.log('TIMELINE_AVAILABLE ------------------------------------------')
            let { data } = action;
            let timelineOld = state.eventsOrInvitations;
            let events = timelineOld.concat(data);
            let eventsOrInvitations = invitations.concat(events);
            return { ...state, eventsOrInvitations, isLoading: false, isLoadingMore: false };
        }

        default:
            return state;
    }
};

export default timelineReducer;