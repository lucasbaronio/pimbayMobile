import { 
    API_INVITATIONS_IN,
    API_INVITATIONS_OUT,
    API_GET_USER_BY_ID
} from './constants';
import { get, post } from '../globalApi';

export function getInvitationsIn(/*userId, */callback) {
    get(API_INVITATIONS_IN({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}

export function getInvitationsOut(/*userId, */callback) {
    get(API_INVITATIONS_OUT({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({userId}), callback);
}
