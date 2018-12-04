import {
    API_GET_USER_BY_ID,
    API_GET_CHAT_LIST,
    API_GET_CHAT_MESSAGES,
    API_MARK_AS_READ_ALL_CHAT_MESSAGES
} from './constants';
import { get, post } from '../globalApi';

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function getChatList(userId, callback) {
    const { url, header } = API_GET_CHAT_LIST();
    post(url, { user_id: userId }, header, callback);
}

export function getChatMessages(chatId, callback) {
    const { url, header } = API_GET_CHAT_MESSAGES();
    post(url, { id: chatId, /*limit: 10*/ }, header, callback);
}

export function markAsReadAllChatMessages({ chatId, userId}, callback) {
    const { url, header } = API_MARK_AS_READ_ALL_CHAT_MESSAGES();
    post(url, { id: userId, group_channel_ids: [chatId] }, header, callback);
}