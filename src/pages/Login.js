import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { login } from "../actions/authActions";
import { connect } from "react-redux";

function Login({ dispatch }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handelSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			email,
			password,
		};
		dispatch(login(newUser));
	};

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100vh" }}
		>
			<Form
				style={{ maxWidth: "1000px" }}
				className="px-4 py-5 bg-light"
				onSubmit={handelSubmit}
			>
				<h3 className="text-center text-bolder mb-4 text-primary">
					Login or Create an Account
				</h3>
				<Form.Group>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						required
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						required
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button variant="outline-primary" className="w-100" type="submit">
					Login
				</Button>
			</Form>
		</Container>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
