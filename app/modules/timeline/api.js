import { 
    API_EVENT, 
    API_CONTEXT_ACTION_LIST,
    API_CREATE_INVITATION,
} from './constants';
import { get, post } from '../globalApi';

export function getEventsOrInvitations(start, callback) {
    get(`${API_EVENT}start=${start}`, callback);
}

export function getEvents(start, callback) {
    get(`${API_EVENT}start=${start}`, callback);
}

export function getContextActionList(callback) {
    get(`${API_CONTEXT_ACTION_LIST}`, callback);
}

export function createInvitation(invitation, callback) {
    post(`${API_CREATE_INVITATION}`, invitation, callback);
}