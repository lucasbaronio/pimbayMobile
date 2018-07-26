import { combineReducers } from 'redux';

import { reducer as authReducer } from "../modules/auth"
import { reducer as timelineReducer } from "../modules/timeline"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, timelineReducer });

export default rootReducer;