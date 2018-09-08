import {
    API_INVITATIONS_IN,
    API_INVITATIONS_OUT,
    API_GET_USER_BY_ID,
    API_GET_CONTEXT_ACTION_BY_ID,
    API_GET_EVENT_BY_ID
} from './constants';
import { get } from '../globalApi';

export function getInvitationsIn(/*userId, */callback) {
    get(API_INVITATIONS_IN({ userId: "7idtcB9R1KNmaPTCfN9y" }), callback);
}

export function getInvitationsOut(/*userId, */callback) {
    get(API_INVITATIONS_OUT({ userId: "7idtcB9R1KNmaPTCfN9y" }), callback);
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
