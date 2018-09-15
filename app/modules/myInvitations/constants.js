import {
    API_INVITATIONS_IN as apiInvitationsIn,
    API_INVITATIONS_OUT as apiInvitationsOut,
    API_USER_BY_ID as apiGetUserById,
    API_CONTEXT_ACTION_BY_ID as apiGetContextActionById,
    API_EVENT_BY_ID as apiGetEventById,
    API_CONFIRM_INVITATION as apiConfirmInvitation,
    API_REJECT_INVITATION as apiRejectInvitation,
    USER_ID as userId
} from "../../config/constants";

export const NAME = 'invitation';

export const API_INVITATIONS_IN = apiInvitationsIn;
export const API_INVITATIONS_OUT = apiInvitationsOut;
export const API_GET_USER_BY_ID = apiGetUserById;
export const API_GET_CONTEXT_ACTION_BY_ID = apiGetContextActionById;
export const API_GET_EVENT_BY_ID = apiGetEventById;
export const API_CONFIRM_INVITATION = apiConfirmInvitation;
export const API_REJECT_INVITATION = apiRejectInvitation;
export const USER_ID = userId;