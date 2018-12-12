import {
    API_GET_USER_BY_ID,
    API_GET_CHAT_LIST,
    API_GET_CHAT_MESSAGES,
    API_MARK_AS_READ_ALL_CHAT_MESSAGES,
    API_SEND_MESSAGE,
    API_ADD_USER_TO_CHAT,
    API_REMOVE_USER_FROM_CHAT,
    API_CHANGE_CHAT_NAME,
    CHAT_GROUP_DEFAULT_NAME,
    API_GET_CHAT_DETAIL,
    API_SEND_NOTIFICATION,
    API_CREATE_CHAT_CHAT_CAMP,
    API_DELETE_CHAT,
} from './constants';
import { get, post } from '../globalApi';

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function createChat({ ownerId, avatar }, callback) {
    const { url, header, bodyExtra } = API_CREATE_CHAT_CHAT_CAMP();
    post(url, { 
        participant_ids: [ownerId],
        name: CHAT_GROUP_DEFAULT_NAME,
        metadata: {
            avatar: avatar
        },
        ...bodyExtra
    }, header, callback);
}

export function getChatList(userId, callback) {
    const { url, header, bodyExtra } = API_GET_CHAT_LIST();
    post(url, { user_id: userId, ...bodyExtra }, header, callback);
}

export function getChatMessages(chatId, callback) {
    const { url, header, bodyExtra } = API_GET_CHAT_MESSAGES();
    post(url, { id: chatId, ...bodyExtra, /*limit: 10*/ }, header, callback);
}

export function markAsReadAllChatMessages({ chatId, userId }, callback) {
    const { url, header, bodyExtra } = API_MARK_AS_READ_ALL_CHAT_MESSAGES();
    post(url, { id: userId, group_channel_ids: [chatId], ...bodyExtra }, header, callback);
}

export function sendMessage({ chatId, userId, message }, callback) {
    const { url, header, bodyExtra } = API_SEND_MESSAGE();
    post(url, { id: chatId, user_id: userId, text: message, ...bodyExtra }, header, callback);
}

export function addUserToChat({ chatId, userId }, callback) {
    const { url, header, bodyExtra } = API_ADD_USER_TO_CHAT();
    post(url, { id: chatId, participant_ids: [userId], ...bodyExtra }, header, callback);
}

export function removeUserFromChat({ chatId, userId }, callback) {
    const { url, header, bodyExtra } = API_REMOVE_USER_FROM_CHAT();
    post(url, { id: chatId, participant_ids: [userId], ...bodyExtra }, header, callback);
}

export function changeChatName({ chatId, name }, callback) {
    const { url, header, bodyExtra } = API_CHANGE_CHAT_NAME();
    post(url, { id: chatId, name, ...bodyExtra }, header, callback);
}

export function getChatDetail({ chatId }, callback) {
    const { url, header, bodyExtra } = API_GET_CHAT_DETAIL();
    post(url, { id: chatId, ...bodyExtra }, header, callback);
}

export function deleteChat(chatId, callback) {
    const { url, header, bodyExtra } = API_DELETE_CHAT();
    post(url, { id: chatId, ...bodyExtra }, header, callback);
}

export function sendNotification({ chat, message, userToPushToken }, callback) {
    const { url, body } = API_SEND_NOTIFICATION({ chat, message, userToPushToken});
    post(url, body, {}, callback);
}

