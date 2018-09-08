export const FIREBASE_API_KEY = "AIzaSyAZXjQr7qvStK9zE-OuG4FW5uv05kDUC-k";
export const FIREBASE_AUTH_DOMAIN = "pimbaymobile.firebaseapp.com";
export const FIREBASE_DATABASE_URL = "https://pimbaymobile.firebaseio.com";
export const FIREBASE_PROJECT_ID = "pimbaymobile";
export const FIREBASE_STORAGE_BUCKET = "pimbaymobile.appspot.com";
export const FIREBASE_MESSAGING_SENDER_ID = "619978772784";

export const FACEBOOK_APP_ID = '197787241068265';

export const API = 'https://api-pimbay.appspot.com/';

export const API_EVENT_SIZE = 10;
export const API_EVENT = `${API}events`;
export const API_EVENTS_PAGINATION = ({ start }) => `${API_EVENT}/pagination?start=${start}&size=${API_EVENT_SIZE}`;
export const API_EVENT_BY_ID = ({ eventId }) => `${API_EVENT}/${eventId}`;

export const API_INVITATION_SIZE = 10;
export const API_INVITATION = `${API}invitations`;
export const API_INVITATIONS_PAGINATION = ({ start }) => `${API_INVITATION}?limit=${API_INVITATION_SIZE}&offset=${start}`;
export const API_INVITATIONS_IN = ({ userId }) => `${API_INVITATION}/${userId}/received`;
export const API_INVITATIONS_OUT = ({ userId }) => `${API_INVITATION}/${userId}/sended`;

export const API_CONTEXT_ACTION = `${API}context-actions`;
export const API_CONTEXT_ACTION_BY_ID = ({ contextActionId }) => `${API_CONTEXT_ACTION}/${contextActionId}`;

export const API_USER = `${API}users`;
export const API_GET_ALL_USERS = `${API}all-users`;
export const API_USER_BY_ID = ({ userId }) => `${API_USER}/${userId}`;