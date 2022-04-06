import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useSelector(state => state.auth);

	const { pathname, search } = useLocation();
	localStorage.setItem('lastPath', pathname + search);

	return isAuthenticated
		? children
		: <Navigate to='/login' />
}