import {
    API_USER_BY_ID as apiGetUserById,
    API_GET_CHAT_LIST as apiGetChatList,
    API_GET_CHAT_MESSAGES as apiGetChatMessages,
    API_MARK_AS_READ_ALL_CHAT_MESSAGES as apiMarkAsReadAllChatMessages,
    API_SEND_MESSAGE as apiSendMessage,
    API_ADD_USER_TO_CHAT as apiAddUserToChat,
    API_REMOVE_USER_FROM_CHAT as apiRemoveUserFromChat,
} from "../../config/constants";

export const NAME = 'chat';

export const API_GET_USER_BY_ID = apiGetUserById;
export const API_GET_CHAT_LIST = apiGetChatList;
export const API_GET_CHAT_MESSAGES = apiGetChatMessages;
export const API_MARK_AS_READ_ALL_CHAT_MESSAGES = apiMarkAsReadAllChatMessages;
export const API_SEND_MESSAGE = apiSendMessage;
export const API_ADD_USER_TO_CHAT = apiAddUserToChat;
export const API_REMOVE_USER_FROM_CHAT = apiRemoveUserFromChat;
