const localStorageName = "blogAppUser";

export const GET_USER = "GET_USER";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const getUser = () => ({
	type: GET_USER,
});

export const loginSuccess = (user) => ({
	type: LOGIN_SUCCESS,
	payload: user,
});

export const loginFailed = () => ({
	type: LOGIN_FAILED,
});

export const login = (newUser) => {
	return (dispatch) => {
		localStorage.setItem(localStorageName, JSON.stringify(newUser));
		dispatch(loginSuccess(newUser));
	};
};

export const checkAuth = () => {
	const user = JSON.parse(localStorage.getItem(localStorageName));
	if (user) return (dispatch) => dispatch(loginSuccess(user));
	else return (dispatch) => dispatch(loginFailed());
};
