import {
    API_EVENTS_PAGINATION,
    API_GET_EVENT_BY_ID,
    API_INVITATIONS_PAGINATION,
    API_INVITATION,
    API_CONTEXT_ACTION,
    API_GET_CONTEXT_ACTION_BY_ID,
    API_GET_ALL_USERS,
    API_GET_USER_BY_ID,
    API_SEARCH_USERS,
    API_SEARCH_EVENTS,
    API_GEOCODING_RESPONSES
} from './constants';
import { get, post } from '../globalApi';

export function getInvitations(start, callback) {
    get(API_INVITATIONS_PAGINATION({ start }), callback);
}

export function getEvents(start, callback) {
    get(API_EVENTS_PAGINATION({ start }), callback);
}

export function getEventById(eventId, callback) {
    get(API_GET_EVENT_BY_ID({ eventId }), callback);
}

export function getContextActionList(callback) {
    get(API_CONTEXT_ACTION, callback);
}

export function getContextActionById(contextActionId, callback) {
    get(API_GET_CONTEXT_ACTION_BY_ID({ contextActionId }), callback);
}

export function createInvitation(invitation, callback) {
    post(API_INVITATION, invitation, {}, callback);
}

export function getFavoriteUsers(callback) {
    get(API_GET_ALL_USERS, callback);
}

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function searchUsersByUserNameOrFullName(value, callback) {
    get(API_SEARCH_USERS({ value }), callback);
}

export function searchEvents(value, callback) {
    get(API_SEARCH_EVENTS({ value }), callback);
}

export function getEventLocation(place, callback) {
    place=place.replace(/ /g,"+");
    get(API_GEOCODING_RESPONSES({ place }), callback);
}