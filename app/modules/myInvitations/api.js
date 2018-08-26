import { 
    API_INVITATION_IN,
    API_INVITATION_OUT,
    API_GET_USER_BY_ID
} from './constants';
import { get, post } from '../globalApi';

export function getInvitationsIn(/*userId, */callback) {
    // get(API_INVITATION_IN({userId}), callback);
    get(API_INVITATION_IN({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}

export function getInvitationsOut(/*userId, */callback) {
    get(API_INVITATION_OUT({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({userId}), callback);
}
