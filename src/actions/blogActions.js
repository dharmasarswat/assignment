export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_SUCCESS = "GET_BLOGS_SUCCESS";
export const GET_BLOGS_FAILURE = "GET_BLOGS_FAILURE";
export const EDIT_BLOG = "EDIT_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";
export const IS_LIKED_BLOG = "IS_LIKED_BLOG";

export const getBlogs = () => ({
	type: GET_BLOGS,
});

export const getBlogsSuccess = (blogs) => ({
	type: GET_BLOGS_SUCCESS,
	payload: blogs,
});

export const getBlogsFailure = () => ({
	type: GET_BLOGS_FAILURE,
});

export const editBlog = ({ data, id }) => ({
	type: EDIT_BLOG,
	payload: { data, id },
});

export const deleteBlog = (id) => ({
	type: DELETE_BLOG,
	payload: { id },
});

export const isLikedBlog = ({ id }) => ({
	type: IS_LIKED_BLOG,
	payload: { id },
});

export function editBlogData(id, data) {
	return (dispatch) => {
		dispatch(editBlog({ id, data }));
	};
}

export function deleteBlogData(id) {
	return (dispatch) => {
		dispatch(deleteBlog(id));
	};
}

export function likeDislikeBlog(id) {
	return (dispatch) => {
		dispatch(isLikedBlog({ id }));
	};
}

export function fetchBlogs() {
	return async (dispatch) => {
		dispatch(getBlogs());

		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts"
			);
			const data = await response.json();
			dispatch(getBlogsSuccess(data));
		} catch (error) {
			dispatch(getBlogsFailure());
		}
	};
}
