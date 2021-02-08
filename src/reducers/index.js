import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import authReducer from "./authReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
	blogs: blogReducer,
	comments: commentReducer,
	auth: authReducer,
});

export default rootReducer;
