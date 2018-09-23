import {
    API_INVITATIONS_IN,
    API_INVITATIONS_OUT,
    API_GET_USER_BY_ID,
    API_GET_CONTEXT_ACTION_BY_ID,
    API_GET_EVENT_BY_ID,
    API_RESPONSE_INVITATION
} from './constants';
import { get, put } from '../globalApi';

export function getInvitationsIn({ userId }, callback) {
    get(API_INVITATIONS_IN({ userId }), callback);
}

export function getInvitationsOut({ userId }, callback) {
    get(API_INVITATIONS_OUT({ userId }), callback);
}

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function getContextActionById(contextActionId, callback) {
    get(API_GET_CONTEXT_ACTION_BY_ID({ contextActionId }), callback);
}

export function getEventById(eventId, callback) {
    get(API_GET_EVENT_BY_ID({ eventId }), callback);
}

export function confirmInvitation({ invitationId, userId }, callback) {
    put(API_RESPONSE_INVITATION({ invitationId, userId }), {
        response: true
    }, callback);
}

export function rejectInvitation({ invitationId, userId }, callback) {
    put(API_RESPONSE_INVITATION({ invitationId, userId }), {
        response: false
    }, callback);
}
