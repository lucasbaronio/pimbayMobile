import { API_GET_EVENT_BY_ID } from './constants';
import { get } from '../globalApi';

export function getEventById(eventId, callback) {
    get(API_GET_EVENT_BY_ID({ eventId }), callback);
}