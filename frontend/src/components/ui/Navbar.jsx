import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { Offline, Online } from 'react-detect-offline';

export const Navbar = () => {
	const { name } = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(startLogout());
	}

	return (
		<div className='navbar navbar-dark bg-dark mb-4'>
			<span className='navbar-brand m-1'>
				{ name }
			</span>
			<Online>
				<span className='text-success'>Online</span>
			</Online>
			<Offline>
			<span className='text-danger'>Offline - Request would be save</span>
			</Offline>
			<button 
				className='btn btn-outline-danger m-1'
				onClick={ handleLogout }
			>
				<i className='fa fa-sign-out'></i>
				<span> Sign Out</span>
			</button>
		</div>
	)
}
