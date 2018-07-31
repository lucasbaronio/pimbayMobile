import { API_EVENT, API_CONTEXT_ACTION_LIST } from './constants';
import { get } from '../globalApi';

export function getEventsOrInvitations(start, callback) {
    get(`${API_EVENT}start=${start}`, callback)
}

export function getContextActionList(callback) {
    get(`${API_CONTEXT_ACTION_LIST}`, callback)
}