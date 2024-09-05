import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
function NoteCard({ title, content, date, tags, isPinned, onEdit, onCreate, onDelete, onPinNote }) {
	return (
		<div className="border rounded bg-white hover:shadow-xl transition-all ease-in-out ">
			<div className="flex items-center justify-between">
				<div>
					<h6 className="text-sm font-medium">{title}</h6>
					<span className="text-xs text-slate-500"> {date}</span>
				</div>
				<MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary" : "text-white"}`} onClick={onPinNote} />
			</div>
			<p className=""> {content}</p>
			<div className="flex items-center justify-between mt-2">
				<div className=" text-xs text-slate-500">{tags}</div>
				<div className="flex items-center gap-2">
					<MdCreate className="icon-btn hover:text-green-500" onClick={onEdit} />
					<MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
				</div>
			</div>
		</div>
	);
}

export default NoteCard;
