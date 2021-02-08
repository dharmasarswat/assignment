import React, { useEffect } from "react";
import { checkAuth } from "./actions/authActions";
import { Route, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

function ProtectedRoutes({ loading, isAuthenticated, component, ...rest }) {
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	if (!isAuthenticated) history.goBack();

	if (!loading && isAuthenticated) {
		return <Route component={component} {...rest} />;
	}

	return null;
}

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoutes);
