import React, { useState } from "react";
import axisoInstance from "../../utils/aixosInstance";
import { BASE_URL } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddNote({ type, noteData, onClose, noteId }) {
	const [title, setTitle] = useState(noteData?.title || "");
	const [content, setContent] = useState(noteData?.content || "");
	const [tags, setTags] = useState(noteData?.tags || []);
	const [error, setError] = useState(noteData?.tags || []);
	// console.log(type);
	const notify = () => toast.info("Create successfully");
	const notifyEdit = () =>
		toast.info("Update successfully", {
			delay: 1000,
		});

	//add note
	const addNote = async () => {
		try {
			const response = await axisoInstance.post(`${BASE_URL}/note`, {
				title,
				content,
				tags,
			});
			if (response.data) {
				notify();
			}
		} catch (error) {
			if (error?.message) {
				setError(error?.message);
			}
		}
	};
	// edit not
	const ediNote = async () => {
		const noteId = noteData?._id;
		try {
			const response = await axisoInstance.put(`${BASE_URL}/note/` + noteId, {
				title,
				content,
				tags,
			});
			if (response.data) {
				notifyEdit();
			}
			// console.log({ title, content, tags });
		} catch (error) {
			// console.log(error);
		}
	};
	return (
		<div>
			<div className="flex flex-col gap-2">
				<label htmlFor="" className="input-label">
					TITLE
				</label>
				<input
					type="text"
					placeholder="Enter title"
					className="text-2xl text-slate-900 outline-none"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<label htmlFor="" className="input-label">
					CONTENT
				</label>
				<textarea
					className="text-2xl text-slate-900 outline-none bg-slate-50 p-2 rounded"
					name=""
					id=""
					cols="30"
					rows="10"
					placeholder="some content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				></textarea>
			</div>
			<div>
				<label htmlFor="" className="input-label">
					#TAGS
				</label>
			</div>
			{error && <p className="text-red-600"> {error}</p>}
			<button className="btn-primary font-medium mt-4 p-3" onClick={type == "add" ? addNote : ediNote}>
				{type == "add" ? "ADD" : "EDIT"}
			</button>
			<ToastContainer />
		</div>
	);
}

export default AddNote;
