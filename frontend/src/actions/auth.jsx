import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const authStartLogin = (email, password) => {
	return async (dispatch) => {
		const resp = await fetchWithoutToken('auth/login', { email, password }, 'POST');
		const body = await resp.json();
	
		if(body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('tokenInitDate', new Date().getTime());
			dispatch(login({
				uid: body.uid,
				name: body.name
			}));
		} else {
			Swal.fire({
				title: 'Error',
				text: body.msg,
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	}
};

const login = (user) => ({
	type: types.authLogin,
	payload: user
});


export const authStartRegister = (name, email, password) => {
	return async (dispatch) => {
		const resp = await fetchWithoutToken('auth/register', { name, email, password }, 'POST');
		const body = await resp.json();
	
		if(body.ok) {
			localStorage.setItem('token', body.token);
			localStorage.setItem('tokenInitDate', new Date().getTime());
			dispatch(register({
				uid: body.uid,
				name: body.name
			}));
		} else {
			Swal.fire({
				title: 'Error',
				text: body.msg,
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
	}
};

const register = (user) => ({
	type: types.authRegister,
	payload: user
});

export const startCheckingIsAuthenicated = () => {
	return async (dispatch) => {
		const token = localStorage.getItem('token');
		const tokenInitDate = localStorage.getItem('tokenInitDate');
		const now = new Date().getTime();
		const diff = now - tokenInitDate;
		const diffMinutes = Math.round((diff/1000)/60);
		if(!token || diffMinutes > 60) {
			dispatch(startLogout());
		} else {
			const resp = await fetchWithToken('auth/renew', {}, 'GET');
			const body = await resp.json();
			if(body.ok) {
				dispatch(login({
					uid: body.uid,
					name: body.name
				}));
			} else {
				dispatch(startLogout());
			}
		}
	}
}

export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear('token');
		dispatch(logout());
	}
}


const logout = () => ({
	type: types.authLogout
});