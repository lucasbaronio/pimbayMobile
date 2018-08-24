import { 
    API_INVITATION_IN,
    API_INVITATION_OUT
} from './constants';
import { get, post } from '../globalApi';

export function getInvitationsIn(/*userId, */callback) {
    // get(API_INVITATION_IN({userId}), callback);
    get(API_INVITATION_IN({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}

export function getInvitationsOut(/*userId, */callback) {
    get(API_INVITATION_OUT({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}
