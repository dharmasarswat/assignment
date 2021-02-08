export const GET_COMMENTS = "GET_COMMENTS";
export const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
export const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";

export const getComments = () => ({
	type: GET_COMMENTS,
});

export const getCommentsSuccess = (comments) => ({
	type: GET_COMMENTS_SUCCESS,
	payload: comments,
});

export const getCommentsFailure = () => ({
	type: GET_COMMENTS_FAILURE,
});

export const editComment = ({ data, id }) => ({
	type: EDIT_COMMENT,
	payload: { data, id },
});

export const deleteComment = (id) => ({
	type: DELETE_COMMENT,
	payload: { id },
});
export const addComment = ({ name, postId, body }) => ({
	type: ADD_COMMENT,
	payload: { name, postId, body },
});

export function editCommentData(id, data) {
	return (dispatch) => {
		dispatch(editComment({ id, data }));
	};
}

export function deleteCommentData(id) {
	return (dispatch) => {
		dispatch(deleteComment(id));
	};
}

export function addCommentData({ name, postId, body }) {
	return (dispatch) => {
		dispatch(addComment({ name, postId, body }));
	};
}

export function fetchComments() {
	return async (dispatch) => {
		dispatch(getComments());

		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/comments"
			);
			const data = await response.json();

			dispatch(getCommentsSuccess(data));
		} catch (error) {
			dispatch(getCommentsFailure());
		}
	};
}
