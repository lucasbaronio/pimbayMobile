import { 
    API_INVITATION_IN,
} from './constants';
import { get, post } from '../globalApi';

export function getInvitationsIn(/*userId, */callback) {
    // get(API_INVITATION_IN({userId}), callback);
    get(API_INVITATION_IN({userId: "DDM2AobexaNzHbRyjuYk"}), callback);
}
