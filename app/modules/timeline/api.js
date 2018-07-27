import { API_EVENT } from './constants';

export function getEventsOrInvitations(start, callback) {
    return fetch(`${API_EVENT}start=${start}`/*, {
            headers: { Authorization: `Bearer ${accessToken}`},
        }*/)
        .then((response) => response.json())
        .then((timeline) => {
            callback(true, timeline, null)
        })
        .catch((error) => {
            callback(false, null, error)
        });
}