import React, { useState } from "react";
import axisoInstance from "../../utils/aixosInstance";
import { BASE_URL } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddNote() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState([]);
	const notify = () => toast.info("Create successfully");
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
			console.log({ title, content, tags });
		} catch (error) {
			console.log(error);
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
			<button className="btn-primary font-medium mt-4 p-3" onClick={addNote}>
				add
			</button>
			<ToastContainer />
		</div>
	);
}

export default AddNote;
