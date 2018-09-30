import {
    API_GET_USER_BY_ID
} from './constants';
import { get } from '../globalApi';

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}