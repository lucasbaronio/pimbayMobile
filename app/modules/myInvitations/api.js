import {
    API_INVITATIONS_IN,
    API_INVITATIONS_OUT,
    API_GET_USER_BY_ID,
    API_GET_CONTEXT_ACTION_BY_ID,
    API_GET_EVENT_BY_ID,
    API_CONFIRM_INVITATION,
    API_REJECT_INVITATION
} from './constants';
import { get, post } from '../globalApi';

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

// Revisar estas funciones cuando termine backend
export function confirmInvitation({ invitationId, userId }, callback) {
    post(API_CONFIRM_INVITATION({ invitationId, userId }), {
        invitationId,
        userId
    }, callback);
}

// Revisar estas funciones cuando termine backend
export function rejectInvitation({ invitationId, userId }, callback) {
    post(API_REJECT_INVITATION({ invitationId, userId }), {
        invitationId,
        userId
    }, callback);
}
