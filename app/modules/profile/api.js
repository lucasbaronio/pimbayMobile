import {
    API_GET_USER_BY_ID,
    API_UPDATE_USER
} from './constants';
import { get, put } from '../globalApi';

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function updateUser(userId, data, callback) {
    put(API_UPDATE_USER({ userId }), data, callback);
}