import React, { useEffect, useState } from "react";
import { Container, Table, Modal, Form, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchComments,
	deleteComment,
	editComment,
	addComment,
} from "../actions/commentActions";

function Comments({ blogs = [], comments = [] }) {
	const [postComments, setPostComments] = useState([]);
	const { id } = useParams();
	const blog = blogs.find((obj) => obj.id === parseInt(id));

	const [editMode, setEditMode] = useState(false);
	const [selectedRow, setSelectedRow] = useState(0);

	const [showAddCommentModal, setShowAddCommentModal] = useState(false);
	const [newCommentBody, setNewCommentBody] = useState("");
	const [newCommentTitle, setNewCommentTitle] = useState("");

	const [editCommentData, setEditCommentData] = useState(
		postComments[selectedRow]?.body
	);

	const dispatch = useDispatch();

	useEffect(() => {
		setPostComments(comments.filter((obj) => obj.postId === parseInt(id)));
	}, [comments]);

	useEffect(() => {
		dispatch(fetchComments());
	}, []);

	const handelEdit = (e) => {
		var id = parseInt(e.target.accessKey);
		setEditCommentData(postComments[id]?.body);
		setSelectedRow(id);
		setEditMode(true);
	};

	const handelDelete = (e) => {
		var id = parseInt(e.target.accessKey);
		dispatch(deleteComment(id));
	};

	const handleClose = () => {
		setEditMode(false);
		setShowAddCommentModal(false);
	};

	const handelSave = () => {
		dispatch(editComment({ id: selectedRow, data: editCommentData }));
		handleClose();
	};

	const handelAddComment = () => {
		dispatch(
			addComment({
				body: newCommentBody,
				postId: parseInt(id),
				name: newCommentTitle,
			})
		);
		setShowAddCommentModal(false);
	};

	if (blog)
		return (
			<Container>
				<h4>Blog id: {blog?.id}</h4>
				<h6>{blog?.body}</h6>
				<p>Comments for this post are down below</p>
				<Table responsive="md" striped bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>description</th>
							<th>Post id</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{postComments.map((data, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{data.name}</td>
								<td>{data.body}</td>
								<td>{data.postId}</td>
								<td
									accessKey={data.id}
									onClick={handelEdit}
									style={{ cursor: "pointer" }}
								>
									Edit
								</td>
								<td
									accessKey={data.id}
									onClick={handelDelete}
									style={{ cursor: "pointer" }}
								>
									Delete
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Button onClick={() => setShowAddCommentModal(true)}>
					Add Comment to this post
				</Button>
				{showAddCommentModal && (
					<Modal show={showAddCommentModal} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Add Comment</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Control
								type="textarea"
								placeholder="Add new Title"
								value={newCommentTitle}
								onChange={(e) => setNewCommentTitle(e.target.value)}
							/>
							<Form.Control
								type="textarea"
								placeholder="Add new comment body"
								value={newCommentBody}
								onChange={(e) => setNewCommentBody(e.target.value)}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handelAddComment}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				)}
				{editMode && (
					<Modal show={editMode} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Edit Comment</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form.Control
								type="textarea"
								value={editCommentData}
								onChange={(e) => setEditCommentData(e.target.value)}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handelSave}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				)}
			</Container>
		);
	else return null;
}

const mapStateToProps = (state) => ({
	blogs: state.blogs.blogs,
	comments: state.comments.comments,
});

export default connect(mapStateToProps)(Comments);
