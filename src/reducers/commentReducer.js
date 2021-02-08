import * as actions from "../actions/commentActions";

export const initialState = {
	comments: [],
	loading: false,
	hasErrors: false,
};

export default function commentsReducer(state = initialState, action) {
	var comment = {};
	switch (action.type) {
		case actions.GET_COMMENTS:
			return { ...state, loading: true };
		case actions.GET_COMMENTS_SUCCESS:
			return { comments: action.payload, loading: false, hasErrors: false };
		case actions.GET_COMMENTS_FAILURE:
			return { ...state, loading: false, hasErrors: true };
		case actions.EDIT_COMMENT:
			comment = state.comments.find((obj) => obj.id === action.payload.id);
			if (comment)
				return {
					...state,
					comments: state.comments.map((data) => {
						if (data.id === action.payload.id)
							return { ...data, body: action.payload.data };
						return data;
					}),
				};
			else return state;

		case actions.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter((obj) => obj.id !== action.payload.id),
			};
		case actions.ADD_COMMENT:
			return {
				...state,
				comments: [
					...state.comments,
					{
						body: action.payload.body,
						name: action.payload.name,
						id: Math.floor(Math.random() * 11) * 100 + 1000,
						postId: action.payload.postId,
					},
				],
			};
		default:
			return state;
	}
}
