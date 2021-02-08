import * as actions from "../actions/authActions";

export const initialState = {
	user: {},
	isAuthenticated: false,
	loading: false,
	hasErrors: false,
};

export default function postsReducer(state = initialState, action) {
	switch (action.type) {
		case actions.GET_USER:
			return { ...state, loading: true };
		case actions.LOGIN_SUCCESS:
			return {
				user: { ...action.payload },
				isAuthenticated: true,
				loading: false,
				hasErrors: false,
			};
		case actions.LOGIN_FAILED:
			return { ...state, hasErrors: true, loading: false };
		default:
			return state;
	}
}
