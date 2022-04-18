import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import modal from './modal.css';
import moment from 'moment';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import {
	calendarClearActiveEvent,
	calendarEventStartUpdating,
	calendarStartAddNewEvent
} from '../../actions/calendar-events';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = moment().minutes(0).seconds(0).add(2, 'hours');
const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: nowPlusOne.toDate()
};

export const CalendarModal = () => {
	const { modalOpen } = useSelector(state => state.ui);
	const { activeEvent } = useSelector(state => state.calendar);
	const dispatch = useDispatch();

	const [startDate, setStartDate] = useState(now.toDate());
	const [endDate, setEndDate] = useState(nowPlusOne.toDate());
	const [titleValid, setTitleValid] = useState(true);
	const [formValues, setFormValues] = useState(initEvent);

	const { title, notes, start, end } = formValues;

	useEffect(() => {
		if(activeEvent) {
			setFormValues(activeEvent);
		} else {
			setFormValues(initEvent);
		}
	}, [activeEvent]);
	

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value
		})
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		const momentStart = moment(start);
		const momentEnd = moment(end);
		if(momentStart.isSameOrAfter(momentEnd)) {
			Swal.fire('Error', 'End date must be greater than start date');
			return;
		}

		if(title.trim() < 2) {
			setTitleValid(false);
			return;
		}

		// TODO: Save in DB
		if(activeEvent) {
			dispatch(calendarEventStartUpdating({
				...formValues,
			}));
		} else {
			dispatch(calendarStartAddNewEvent(formValues));
		}
		setTitleValid(true);
		closeModal();
	};

	const closeModal = () => {
		dispatch(uiCloseModal());
		setFormValues(initEvent);
		dispatch(calendarClearActiveEvent());
	};

	const handleStartDateChange = (e) => {
		setStartDate(e);
		setFormValues({
			...formValues,
			start: e
		});
	}
	
	const handleEndDateChange = (e) => {
		setEndDate(e);
		setFormValues({
			...formValues,
			end: e
		});

	}

	return (
		<>
			<Modal
        isOpen={ modalOpen }
        onRequestClose={ closeModal }
        style={ customStyles }
				closeTimeoutMS={ 200 }
        className='modal'
				overlayClassName='modal-fondo'
      >
        <h2> { !activeEvent ? 'New Event' : 'Edit Event - ' + activeEvent?.title } </h2>
				<hr />
				<form
					className='container'
					onSubmit={ handleSubmitForm }
				>

						<div className='form-group'>
								<label>Fecha y hora inicio</label>
								<DateTimePicker
									onChange={ handleStartDateChange }
									value={ startDate } 
									className='form-control'
								/>
								<input className='form-control' placeholder='Fecha inicio' />
						</div>

						<div className='form-group'>
								<label>Fecha y hora fin</label>
								<DateTimePicker
									onChange={ handleEndDateChange }
									value={ endDate } 
									minDate={ startDate }
									className='form-control'
								/>
						</div>

						<hr />
						<div className='form-group'>
								<label>Titulo y notas</label>
								<input 
										type='text' 
										className={ `form-control ${ !titleValid && 'is-invalid' } `}
										placeholder='Título del evento'
										name='title'
										value={ title }
										onChange={ handleInputChange }
										autoComplete='off'
								/>
								<small id='emailHelp' className='form-text text-muted'>Una descripción corta</small>
						</div>

						<div className='form-group'>
								<textarea 
										type='text' 
										className='form-control'
										placeholder='Notas'
										rows='5'
										name='notes'
										value={ notes }
										onChange={ handleInputChange }
								></textarea>
								<small id='emailHelp' className='form-text text-muted'>Información adicional</small>
						</div>

						<button
								type='submit'
								className='btn btn-outline-primary btn-block'
						>
								<i className='far fa-save'></i>
								<span> Guardar</span>
						</button>

				</form>
      </Modal>
		</>
	)
}
