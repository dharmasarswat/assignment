import React, { Fragment, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { checkAuth } from "../actions/authActions";

function Home({ isAuthenticated }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	const login = (
		<Fragment>
			<h6>Login to view your blogs or comments</h6>
			<Link to="/login" className="mt-4">
				<Button variant="outline-success" className="mr-4 px-4">
					Login
				</Button>
			</Link>
		</Fragment>
	);
	const viewBlogs = (
		<Fragment>
			<h6>View your blog or comments</h6>
			<Link to="/blog" className="mt-4">
				<Button variant="outline-success" className="mr-4 px-4">
					Blog
				</Button>
			</Link>
		</Fragment>
	);

	return (
		<Container>
			<main
				style={{ height: "100vh" }}
				className="d-flex justify-content-center align-items-center flex-column"
			>
				<h1 className="text-primary text-bold" style={{ fontSize: "48px" }}>
					Welcome to the Blog aap!
				</h1>
				{isAuthenticated ? viewBlogs : login}
			</main>
		</Container>
	);
}

const mapStateWithProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateWithProps)(Home);
