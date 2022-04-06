import { store } from './store/store';
import { AppRoute } from './routes/AppRoute'
import { Provider } from 'react-redux';

export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <AppRoute />
    </Provider>
  )
}
