import * as actions from "../actions/blogActions";

export const initialState = {
	blogs: [],
	loading: false,
	hasErrors: false,
};

export default function blogsReducer(state = initialState, action) {
	var blog = {};
	switch (action.type) {
		case actions.GET_BLOGS:
			return { ...state, loading: true };

		case actions.GET_BLOGS_SUCCESS:
			return { blogs: action.payload, loading: false, hasErrors: false };

		case actions.GET_BLOGS_FAILURE:
			return { ...state, loading: false, hasErrors: true };

		case actions.EDIT_BLOG:
			blog = state.blogs.find((obj) => obj.id === action.payload.id);
			if (blog)
				return {
					...state,
					blogs: state.blogs.map((data) => {
						if (data.id === action.payload.id)
							return { ...data, body: action.payload.data };
						return data;
					}),
				};
			else return state;

		case actions.DELETE_BLOG:
			return {
				...state,
				blogs: state.blogs.filter((obj) => obj.id !== action.payload.id),
			};

		case actions.IS_LIKED_BLOG:
			blog = state.blogs.find((obj) => obj.id === action.payload.id);
			if (blog)
				return {
					...state,
					blogs: state.blogs.map((data) => {
						if (data.id === action.payload.id)
							return { ...data, liked: !data.liked };
						return data;
					}),
				};
			else return state;

		default:
			return state;
	}
}
