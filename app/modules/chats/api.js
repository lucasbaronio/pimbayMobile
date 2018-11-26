import {
    API_GET_USER_BY_ID,
    API_GET_CHAT_LIST
} from './constants';
import { get, post } from '../globalApi';

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function getChatList(userId, callback) {
    const { url, header } = API_GET_CHAT_LIST();
    post(url, { user_id: userId }, header, callback);
}