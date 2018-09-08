import * as t from './actionTypes';

let initialState = {
    event: null,
    isLoadingEvent: false,
};

const eventDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_INVITATION_OUT: {
            const event = state.event;

            if (!event)
                return { ...state, isLoadingEvent: true }

            return state;
        }

        case t.EVENT_AVAILABLE: {
            let { data } = action;
            let event = data;
            return { ...state, event, isLoadingEvent: false };
        }

        default:
            return state;
    }
};

export default eventDetailReducer;