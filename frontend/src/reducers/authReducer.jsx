import { types } from "../types/types";

const initialState = {
	isAuthenticated: false
	// uid: null,
	// name: null
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.authLogin:
			return {
				...state,
				isAuthenticated: true,
				...action.payload
			}
		case types.authRegister:
			return {
				...state,
				isAuthenticated: true,
				...action.payload
			}
		case types.authLogout:
			return {
				...state,
				isAuthenticated: false,
				uid: null,
				name: null
			}
		default:
			return state;
	}

}