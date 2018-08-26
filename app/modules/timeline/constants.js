import {
    API_EVENTS_PAGINATION as apiEventPagination,
    API_EVENT_SIZE as apiEventSize,
    API_INVITATION as apiInvitation,
    API_INVITATIONS_PAGINATION as apiInvitationsPagination,
    API_INVITATION_SIZE as apiInvitationSize,
    API_CONTEXT_ACTION as apiContextActionList,
    API_CONTEXT_ACTION_BY_ID as apiGetContextActionById,
    API_CREATE_INVITATION as apiCreateInvitation,
    API_GET_ALL_USERS as apiGetAllUsers,
    API_USER_BY_ID as apiGetUserById,
    API_EVENT_BY_ID as apiGetEventById
} from "../../config/constants";

export const NAME = 'timeline';

export const API_EVENTS_PAGINATION = apiEventPagination;
export const API_EVENT_SIZE = apiEventSize;
export const API_GET_EVENT_BY_ID = apiGetEventById;
export const API_INVITATION = apiInvitation;
export const API_INVITATIONS_PAGINATION = apiInvitationsPagination;
export const API_INVITATION_SIZE = apiInvitationSize;
export const API_CONTEXT_ACTION = apiContextActionList;
export const API_GET_CONTEXT_ACTION_BY_ID = apiGetContextActionById;
export const API_CREATE_INVITATION = apiCreateInvitation;
export const API_GET_ALL_USERS = apiGetAllUsers;
export const API_GET_USER_BY_ID = apiGetUserById;
