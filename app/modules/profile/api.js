import {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    API_ADD_FAVOURITE_USER,
    API_REMOVE_FAVOURITE_USER
} from './constants';
import { get, put, deleteMethod } from '../globalApi';

export function getUserById(userId, callback) {
    get(API_GET_USER_BY_ID({ userId }), callback);
}

export function updateUser(userId, data, callback) {
    put(API_UPDATE_USER({ userId }), data, callback);
}

export function addFavouriteUser(urlData, bodyData, callback) {
    put(API_ADD_FAVOURITE_USER(urlData), bodyData, callback);
}

export function removeFavouriteUser(urlData, bodyData, callback) {
    deleteMethod(API_REMOVE_FAVOURITE_USER(urlData), bodyData, callback);
}