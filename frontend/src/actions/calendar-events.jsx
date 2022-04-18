import moment from 'moment';
import Swal from 'sweetalert2';
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const calendarStartAddNewEvent = (event) => {
	return async (dispatch, getState) => {
		try {
			const { uid, name } = getState().auth;
			const resp = await fetchWithToken('events/add', event, 'POST');
			const data = await resp.json();
			if(data.ok) {
				event.id = data.event.id;
				event.user = {
					_id: uid,
					name: name,
				};
				dispatch(calendarAddNewEvent(event));
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'Error creating event',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	};
}

const calendarAddNewEvent = (event) => ({
	type: types.calendarAddNewEvent,
	payload: event
});

export const calendarSetActiveEvent = (event) => ({
	type: types.calendarSetActiveEvent,
	payload: event
});

export const calendarClearActiveEvent = () => ({
	type: types.calendarClearActiveEvent
});

export const calendarEventStartUpdating = (event) => {
	return async (dispatch, getState) => {
		try {
			const id = event.id;
			const resp = await fetchWithToken(`events/${id}/edit`, { event }, 'PUT');
			const data = await resp.json();
			if(data.ok) {
				dispatch(calendarUpdateEvent(event));
			} else {
				Swal.fire({
					title: 'Error',
					text: 'Error editing event',
					icon: 'error',
					confirmButtonText: 'Ok'
				});
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'Error editing event',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	}
};

const calendarUpdateEvent = (event) => ({
	type: types.calendarUpdateEvent,
	payload: event
});

export const calendarEventStartDeleting = () => {
	return async (dispatch, getState) => {
		try {
			const id = getState().calendar.activeEvent.id;
			const resp = await fetchWithToken(`events/${id}/delete`, { }, 'PUT');
			const data = await resp.json();
			if(data.ok) {
				dispatch(calendarRemoveEvent());
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'Error deleting event',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	}
};

const calendarRemoveEvent = () => ({
	type: types.calendarRemoveEvent
});

export const calendarEventStartLoading = () => {
	return async (dispatch) => {
		try {
			const resp = await fetchWithToken('events');
			const data = await resp.json();
			if(data.ok) {
				const events = data.events.map(event => {
					event.start = moment(event.start).toDate();
					event.end = moment(event.end).toDate();
					return event;
				});
				dispatch(calendarLoadedEvent(events));
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'Error loading events',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	}
};

const calendarLoadedEvent = (events) => ({
	type: types.calendarLoadedEvent,
	payload: events
});