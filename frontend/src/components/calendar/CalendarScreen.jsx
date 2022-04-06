import { Navbar } from "../ui/Navbar";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from "../../helpers/calendar-messages-es";
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from "./CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { calendarClearActiveEvent, calendarSetActiveEvent } from "../../actions/calendar-events";
import { AddNewFab } from "../ui/AddNewFab";
import { RemoveFab } from "../ui/RemoveFab";

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const dispatch = useDispatch();
  const { events, activeEvent } = useSelector(state => state.calendar);

  useEffect(() => {
    
  }, [events])
  

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectClick = (e) => {
    dispatch(calendarSetActiveEvent(e));
  };
  
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    dispatch(calendarClearActiveEvent());
  };

  const eventsStyleGetter = (e, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0ox',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  };

  return (
    <div className='calendar__screen'>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccesor='start'
        endAccesor='end'
        messages={ messages }
        eventPropGetter={ eventsStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectClick }
        onView={ onViewChange }
        view={ lastView }
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      { activeEvent && <RemoveFab />}

      <CalendarModal />
    </div>
  )
}
