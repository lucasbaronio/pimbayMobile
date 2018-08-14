import * as t from './actionTypes';
import invitations from './scenes/Timeline/invitations.json';

let initialState = {
    isLoading: false,
    isLoadingMore: false,
    eventsOrInvitations: [],
    isLoadingEvents: false,
    isLoadingMoreEvents: false,
    events: [],
    isLoadingContextActionList: false,
    contextActions: [],
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
            let { data, start } = action;
            let timelineOld = state.eventsOrInvitations;
            let eventsOrInvitations = timelineOld;
            if (start === 0)
                eventsOrInvitations = eventsOrInvitations.concat(invitations)
            eventsOrInvitations = eventsOrInvitations.concat(data);
            return { ...state, eventsOrInvitations, isLoading: false, isLoadingMore: false };
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
            let { data } = action;
            // let timelineOld = state.eventsOrInvitations;
            // let eventsOrInvitations = timelineOld;
            let events = state.events;
            events = events.concat(data);
            return { ...state, events, isLoadingEvents: false, isLoadingMoreEvents: false };
        }

        case t.LOADING_CONTEXT_ACTION_LIST: {
            return { ...state, isLoadingContextActionList: true }
        }

        case t.CONTEXT_ACTION_LIST_AVAILABLE: {
            let { data } = action;
            let contextActions = data
            return { ...state, contextActions, isLoadingContextActionList: false }
        }

        default:
            return state;
    }
};

export default timelineReducer;