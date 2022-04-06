import { types } from "../types/types";

export const calendarAddNewEvent = (event) => ({
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

export const calendarUpdateEvent = (event) => ({
	type: types.calendarUpdateEvent,
	payload: event
});

export const calendarRemoveEvent = () => ({
	type: types.calendarRemoveEvent
});