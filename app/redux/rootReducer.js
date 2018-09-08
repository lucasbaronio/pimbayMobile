import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as timelineReducer } from "../modules/timeline"
import { reducer as invitationsReducer } from "../modules/myInvitations"
import { reducer as eventDetailReducer } from "../modules/eventDetail"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, timelineReducer, invitationsReducer, eventDetailReducer });

export default rootReducer;