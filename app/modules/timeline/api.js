import { API_EVENT } from './constants';
import invitations from './scenes/Timeline/invitations.json';

export function getEventsOrInvitations(start, callback) {
    return fetch(`${API_EVENT}start=${start}`/*, {
            headers: { Authorization: `Bearer ${accessToken}`},
        }*/)
        .then((response) => response.json())
        .then((timeline) => {
            let timelineWithInvitations = timeline;
            if (start === 0)
                timelineWithInvitations = [].concat(timeline).concat(invitations);
            callback(true, timelineWithInvitations, null)
            // Cuando tengamos en el timeline eventos e invitaciones solo sirve esta linea
            // callback(true, timeline, null)
        })
        .catch((error) => {
            callback(false, null, error)
        });
}