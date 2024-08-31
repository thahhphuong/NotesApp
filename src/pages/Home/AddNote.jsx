import React from "react";

function AddNote() {
	return (
		<div>
			<div className="flex flex-col gap-2">
				<label htmlFor="" className="input-label">
					TITLE
				</label>
				<input type="text" placeholder="Enter title" className="text-2xl text-slate-900 outline-none" />
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
				></textarea>
			</div>
			<div>
				<label htmlFor="" className="input-label">
					#TAGS
				</label>
			</div>
			<button className="btn-primary font-medium mt-4 p-3" onClick={() => {}}>add</button>
		</div>
	);
}

export default AddNote;
