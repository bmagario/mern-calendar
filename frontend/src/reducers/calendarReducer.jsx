import moment from "moment";
import { types } from "../types/types";

const initialState = {
	events: [{
		id: new Date().getDate(),
		title: 'My Birthday',
		start: moment().toDate(),
		end: moment().add(2, 'hours').toDate(),
		bgcolor: '#fafafa',
		notes: 'Buy cake',
		user: {
			_id: '123',
			name: 'Brian' 
		}
	}],
	activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.calendarAddNewEvent:
			return {
				...state,
				events: [action.payload, ...state.events]
			};
		case types.calendarUpdateEvent:
			return {
				...state,
				events: state.events.map(
					e => (e.id === action.payload.id) ? action.payload : e
				)
			};
		case types.calendarRemoveEvent:
			return {
				...state,
				events: state.events.filter(
					e => (e.id !== state.activeEvent.id)
				),
				activeEvent: null
			};
		case types.calendarSetActiveEvent:
			return {
				...state,
				activeEvent: action.payload
			};
		case types.calendarClearActiveEvent:
			return {
				...state,
				activeEvent: null
			};
		default:
			return state;
	}
}