
import {
    API_USER_BY_ID as apiGetUserById,
    API_GET_CHAT_LIST as apiGetChatList,
    API_GET_CHAT_MESSAGES as apiGetChatMessages,
    API_MARK_AS_READ_ALL_CHAT_MESSAGES as apiMarkAsReadAllChatMessages,
    API_SEND_MESSAGE as apiSendMessage,
    API_ADD_USER_TO_CHAT as apiAddUserToChat,
    API_REMOVE_USER_FROM_CHAT as apiRemoveUserFromChat,
    API_CHANGE_CHAT_NAME as apiChangeChatName,
    API_GET_CHAT_DETAIL as apiGetChatDetail,
    API_SEND_NOTIFICATION as apiSendNotification,
} from "../../config/constants";

export const NAME = 'chat';

export const API_GET_USER_BY_ID = apiGetUserById;
export const API_GET_CHAT_LIST = apiGetChatList;
export const API_GET_CHAT_MESSAGES = apiGetChatMessages;
export const API_MARK_AS_READ_ALL_CHAT_MESSAGES = apiMarkAsReadAllChatMessages;
export const API_SEND_MESSAGE = apiSendMessage;
export const API_ADD_USER_TO_CHAT = apiAddUserToChat;
export const API_REMOVE_USER_FROM_CHAT = apiRemoveUserFromChat;
export const API_CHANGE_CHAT_NAME = apiChangeChatName;
export const API_GET_CHAT_DETAIL = apiGetChatDetail;
export const API_SEND_NOTIFICATION = apiSendNotification;

export const URL_PROXY = 'https://cors-anywhere.herokuapp.com/';
export const NO_IMG_CARD = 'https://www.kdeblog.com/wp-content/themes/gonzo/images/no-image-featured-image.png';
export const CHAT_GROUP_DEFAULT_NAME = 'Ingrese un nombre al grupo';