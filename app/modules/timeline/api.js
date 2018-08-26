import { 
    API_EVENTS_PAGINATION, 
    API_INVITATIONS_PAGINATION,
    API_INVITATION,
    API_CONTEXT_ACTION,
    API_GET_CONTEXT_ACTION_BY_ID,
    API_GET_ALL_USERS,
    API_GET_USER_BY_ID
} from './constants';
import { get, post } from '../globalApi';

// export function getEventsOrInvitations(start, callback) {
//     get(`${API_EVENT}start=${start}`, callback);
// }

export function getInvitations(start, callback) {
    get(API_INVITATIONS_PAGINATION({start}), callback);
}

export function getEvents(start, callback) {
    get(API_EVENTS_PAGINATION({start}), callback);
}

export function getContextActionList(callback) {
    get(API_CONTEXT_ACTION, callback);
}

export function getContextActionById(contextActionId, callback) {
    get(API_GET_CONTEXT_ACTION_BY_ID({contextActionId}), callback);
}

export function createInvitation(invitation, callback) {
    post(API_INVITATION, invitation, callback);
}

export function getFavoriteUsers(callback) {
    get(API_GET_ALL_USERS, callback);
}

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({userId}), callback);
}