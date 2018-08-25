import { 
    API_EVENT, 
    API_INVITATION,
    API_CONTEXT_ACTION_LIST,
    API_CREATE_INVITATION,
    API_GET_USER_BY_ID
} from './constants';
import { get, post } from '../globalApi';

// export function getEventsOrInvitations(start, callback) {
//     get(`${API_EVENT}start=${start}`, callback);
// }

export function getInvitations(start, callback) {
    // get(`${API_INVITATION}start=${start}`, callback);
    get(API_INVITATION, callback);
}

export function getEvents(start, callback) {
    get(`${API_EVENT}start=${start}`, callback);
}

export function getContextActionList(callback) {
    get(`${API_CONTEXT_ACTION_LIST}`, callback);
}

export function createInvitation(invitation, callback) {
    post(`${API_INVITATION}`, invitation, callback);
}

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({userId}), callback);
}