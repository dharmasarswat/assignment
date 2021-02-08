import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import {
	fetchBlogs,
	editBlog,
	deleteBlog,
	likeDislikeBlog,
} from "../actions/blogActions";
import { useHistory } from "react-router-dom";

function Blogs({ blogs = [], loading, hasErrors }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [page, setPage] = useState(1);
	const [editMode, setEditMode] = useState(false);
	const [selectedRow, setSelectedRow] = useState(0);
	const [visibleBlogs, setVisibleBlogs] = useState(
		blogs.slice((page - 1) * 5, page * 5)
	);
	const [editBlogData, setEditBlogData] = useState(
		visibleBlogs[selectedRow]?.body
	);

	const lastPage = blogs.length / 5;

	useEffect(() => {
		dispatch(fetchBlogs());
	}, []);

	useEffect(() => {
		setVisibleBlogs(blogs.slice((page - 1) * 5, page * 5));
	}, [page, blogs]);

	const handelPrevious = () => {
		setPage((page) => page - 1);
	};
	const handelNext = () => {
		setPage((page) => page + 1);
	};

	const handelEdit = (e) => {
		var id = parseInt(e.target.accessKey);
		setEditBlogData(blogs[id]?.body);
		setSelectedRow(id);
		setEditMode(true);
	};

	const handelDelete = (e) => {
		var id = parseInt(e.target.accessKey);
		dispatch(deleteBlog(id));
	};

	const handelLike = (e) => {
		var id = parseInt(e.target.accessKey);
		dispatch(likeDislikeBlog(id));
	};

	const handleClose = () => {
		setEditMode(false);
	};

	const handelSave = () => {
		dispatch(editBlog({ id: selectedRow, data: editBlogData }));
		handleClose();
	};

	if (loading) return "Loading...";
	if (hasErrors) return "Failed to load data! please try refreshing.";
	return (
		<Container>
			<h5 className="text-center mt-5">Blogs</h5>
			<Table responsive="md" striped bordered className="mt-4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
						<th>Action</th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>
					{visibleBlogs.map((data, index) => (
						<tr key={data.id}>
							<td>{data.id}</td>
							<td>{data.title}</td>
							<td key={data.body}>{data.body}</td>
							<td
								onClick={handelEdit}
								accessKey={data.id}
								style={{ cursor: "pointer" }}
							>
								Edit
							</td>
							<td
								onClick={handelDelete}
								accessKey={data.id}
								style={{ cursor: "pointer" }}
							>
								Delete
							</td>
							<td
								onClick={handelLike}
								accessKey={data.id}
								key={data.liked}
								style={{ cursor: "pointer" }}
							>
								{data.liked ? "Dislike" : "Like"}
							</td>
							<td
								onClick={() => history.push(`/blogs/${data.id}`)}
								style={{ cursor: "pointer" }}
							>
								View
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<div className="d-flex justify-content-center align-items-center mb-5">
				{page > 1 && (
					<Button className="mr-4" onClick={handelPrevious}>
						Previous
					</Button>
				)}
				{page !== lastPage && <Button onClick={handelNext}>Next</Button>}
			</div>
			{editMode && (
				<Modal show={editMode} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Blog</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Control
							type="textarea"
							value={editBlogData}
							onChange={(e) => setEditBlogData(e.target.value)}
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
}

const mapStateToProps = (state) => ({
	blogs: state.blogs.blogs,
	loading: state.blogs.loading,
	hasErrors: state.blogs.hasError,
});

export default connect(mapStateToProps)(Blogs);
