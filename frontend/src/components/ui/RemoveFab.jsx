import React from 'react'
import { useDispatch } from 'react-redux';
import { calendarRemoveEvent } from '../../actions/calendar-events';

export const RemoveFab = () => {
	const dispatch = useDispatch();
	const handleRemoveEvent = () => {
		dispatch(calendarRemoveEvent());
	};

	return (
		<button
			className='btn btn-danger fab-danger'
			onClick={ handleRemoveEvent }
		>
			<i className='fa fa-trash'></i>
			<span>Remove Event</span>
		</button>
	)
}
